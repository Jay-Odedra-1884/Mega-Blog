import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        // slug,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite services :: cretePost(config.js) :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
        ["*"]
      );
    } catch (error) {
      console.log("Appwrite services :: updatePost(config.js) :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      this.databases.deleteDocument(conf.databaseId, conf.collectionId, slug);
      return true;
    } catch (error) {
      console.log("Appwrite services :: deletePost(config.js) :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite services :: getPost(config.js) :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.databases.listDocuments(
        conf.databaseId,
        conf.collectionId,
        queries
      );
    } catch (error) {
      console.log("AAppwrite services :: getPosts(config.js) :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(conf.bucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite services :: uploadFile(config.js) :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.bucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite services :: deleteFile(config.js) :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.bucketId, fileId);
    } catch (error) {
      console.log("Appwrite services :: uploadFile(config.js) :: error", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
