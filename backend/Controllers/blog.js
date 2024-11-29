import Blog from "./../Modals/blog.js";

export const uploadBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new Blog({ title: title, content: content, author: author });
        console.log(newBlog);
        await newBlog.save();
        return res.status(200).json({ message: "Blog uploaded"});
    } catch (error) {
      return res.status(500).json({ message: "Error during upload", error });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
      const blogList = await Blog.find({});
      return res.status(200).json({ message: "Blogs found", blogList });
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve blogs", error: error.message });
    }
};
  