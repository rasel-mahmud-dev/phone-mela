/* GET home page. */
import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import slugify from "../utils/slugify";
import {RequestWithSession} from "../types";
import {CategoryType} from "../models/Category";


export const getCategories = async (req: Request, res: Response, next:NextFunction)=> {
  
  try {
    const Category =  mongoose.model("Category")
    let categories: any = await Category.find({})
    
    return res.status(200).json(categories);
  } catch (ex){
    return res.status(500).json( null);

  } finally {
  
  }

}

export const getSidebarData = async (req: RequestWithSession, res: Response, next:NextFunction)=> {
  
  let isAdmin = false
  if(req.session && req.session.role === "admin"){
    isAdmin = true
  }
  
  try {
    let catWithPost = {}
    
    const Post =  mongoose.model("Post")
    let posts: any = []
    console.log("sdf")
    if(isAdmin){
      posts = await Post.find({}).select("-content")
    } else {
      posts = await Post.find({ is_public: true }).select("-content")
    }
    const Category =  mongoose.model("Category")
    let categories: any = await Category.find({})
    
    categories.forEach(category=>{
      posts.findIndex(post=>{
        if(category.slug === post.category_slug){
          if(catWithPost[category.slug]){
            catWithPost[category.slug] = [
              ...catWithPost[category.slug],
              post
            ]
          } else {
            catWithPost[category.slug] = [post]
          }
        }
      })
    })

    return res.status(200).json( {
      sidebarData: catWithPost,
      categories: categories
    });

  } catch (ex){
    res.status(500).json( {
      sidebarData: null
    });

  } finally {
  
  }

}

export const getPost = async (req: Request, res: Response, next:NextFunction)=> {
  
  const {slug, withCategories = false}  = req.body
  try {
    
    const Post =  mongoose.model("Post")
    let post = await Post.findOne({slug: slug})
    if(post) {
      return res.json(post)
    } else {
      return res.status(404).json(null)
    }
  } catch (ex){
    return res.status(500).json( null);

  } finally {
  
  }
}



export const addPostHandler =   async (req: RequestWithSession, res: Response, next:NextFunction)=>{
  
  const {title, summary, content,is_public, category_slug, slug} = req.body
  
  
  let Post = mongoose.model("Post")
  let newPost  = new Post({
    title,
    summary,
    content,
    category_slug,
    is_public,
    slug,
    author_id: req.session.user_id
  })
  
  try{
    let a: any = await newPost.validate();
    a = await newPost.save()
    if(a){
      res.status(201).json({
        title,
        summary,
        content,
        category_slug,
        slug,
        author_id: a.author_id,
        _id: a._id
      })
    } else {
      res.status(500).json({message : "post create fail"})
    }
    
  } catch (ex){
    res.status(500).json({message: ex.message})
    console.log(ex.errors)
  }
}


export const addCategoryHandler =   async (req: Request, res: Response, next:NextFunction)=>{
  const {categoryName} = req.body
  let Category = mongoose.model("Category")
  let cat = await Category.findOne({slug:  slugify(categoryName)})
  if(cat) {
    return res.status(409).json({message: categoryName + " already exists"})
  }
  
  let newCategory: any  = new Category({
    name: categoryName,
    slug: slugify(categoryName)
  })
  
  
  try{
    newCategory  = await newCategory.save()
    if(newCategory) {
      res.status(201).send({
        name: newCategory.name,
        slug: newCategory.slug,
        _id: newCategory._id
      })
    } else {
      res.status(500).json({message: "category not save"})
    }
  } catch (ex){
    res.status(500).json({message: ex.message})
  }
}

export const updatePost =   async (req: RequestWithSession, res: Response, next:NextFunction)=>{
  
  const {_id} = req.body

  try {
    
    let Post = mongoose.model("Post")
    let isUpdated  = await Post.updateOne(
      {_id: _id}, {
        $set: {
          ...req.body
        }
      }
    )
    if(isUpdated.modifiedCount > 0){
      res.status(201).json({
        ...req.body
      })
    } else {
      res.status(500).json({message: "post update fail"})
    }
    
  } catch (ex){
    res.status(500).json({message: ex.message})
    
  } finally {
  
  }
}

export const deletePost =   async (req: RequestWithSession, res: Response, next:NextFunction)=>{

  const { post_id} = req.params

  try {
    
    let Post = mongoose.model("Post")
    let isDeleted  = await Post.deleteOne({_id: post_id})
    if(isDeleted.deletedCount > 0){
      res.status(201).json({message: "post deleted"})
    } else {
      res.status(500).json({message: "post delete fail"})
    }
    
  } catch (ex){
    res.status(500).json({message: ex.message})
    
  } finally {
  
  }
}
