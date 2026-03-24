import {test , expect} from '@playwright/test'
import User from '../models/User';
import RegisterPage from '../Pages/RegisterPage';
import TodoPage from '../Pages/TodoPage';
test("should be able to register to todo website" ,  async ({page})=>{
    const user = new User();
    
    const registerPage = new RegisterPage(page);
    await registerPage.load();
    await registerPage.register(user);
    
    //assertion 
    const todoPage = new TodoPage(page);
    const welcomeMessage = todoPage.getWelcomeMessage();
    console.log(await welcomeMessage.innerText());
    await expect(welcomeMessage).toBeVisible();
}) 