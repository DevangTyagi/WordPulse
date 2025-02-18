import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //Call Another method of logging in to the account
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      console.log(email,password)
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async getCurrentuser() {
    try {
      const account = await this.account.get();
      return account;
    } catch (error) {
      throw error;
    }
  }  

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authservice = new Authservice();

export default authservice;
