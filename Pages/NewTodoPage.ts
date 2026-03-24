import { APIRequestContext, Page } from "@playwright/test";
import TodoApi from "../Apis/TodoApi";
import User from "../models/User";

export default class NewTodoPage {
    private page:Page;
    private request?:APIRequestContext;
    constructor(page:Page , request?:APIRequestContext){
        this.page = page;
        this.request = request;
    }
    private get newTodoInput (){
        return '[data-testid="new-todo"]';
    }
    private get newSubmitTodo (){
        return '[data-testid="submit-newTask"]';
    }

    async load(){
        await this.page.goto('/todo/new');
    }

    async addNewTask (todo:string){
        await this.page.type(this.newTodoInput , (todo));
        await this.page.click(this.newSubmitTodo);
    }

    async addNewTaskUsingApi(user:User){
        await new TodoApi(this.request!).addTodo(user);
    }
}