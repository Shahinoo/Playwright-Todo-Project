import {test , expect} from '@playwright/test'
import User from '../models/User';
import RegisterPage from '../Pages/RegisterPage';
import NewTodoPage from '../Pages/NewTodoPage';
import TodoPage from '../Pages/TodoPage';

test('should be able to add todo succefuly' , async ({page , request , context})=>{
    const user = new User();
    //Register with the api instead of writing again sign up steps
    const registerPage = new RegisterPage(page , request , context);
    await registerPage.registerByApi(user);
    //UI steps
    const newTodoPage = new NewTodoPage(page);
    await newTodoPage.load();
    await newTodoPage.addNewTask("Playwright")
    const todoPage = new TodoPage(page);
    const todoText = await todoPage.getTodoTextByIndex(0);
    expect(todoText).toEqual('Playwright');
})

test('should be able to delete a todo' , async ({page , request , context})=>{
    //Create User
    const user = new User();

    //Register with the api instead of writing again sign up steps
    const registerPage = new RegisterPage(page , request , context);
    await registerPage.registerByApi(user);
    
    const newTodoPage = new NewTodoPage(page , request);
    await newTodoPage.addNewTaskUsingApi(user);
    
    const todoPage =new TodoPage (page);
    await todoPage.load();

    await todoPage.deleteTodoByIndex(0);

    const noTodoMessage = todoPage.showNoTodoMessage();
    console.log(await noTodoMessage.innerText());
    await expect(noTodoMessage).toBeVisible();
})

