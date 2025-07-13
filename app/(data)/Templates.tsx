export default [
  {
    name: "Blog Title",
    desc: "An AI tool that generates blog title depending on your blog information",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4693/4693321.png",
    aiPrompt:
      "Give me 5 blog topic ideas in bullet wise only based on given niche & outline and give me result in Rich text editor format",
    slug: "generate-blog-title",
    form: [
      {
        label: "Enter Your Blog Niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        label: "Enter Blog Outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Blog Content",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language",
    category: "blog",
    icon: "https://cdn-icons-png.flaticon.com/128/9623/9623631.png",
    slug: "blog-content-generation",
    aiPrompt:
      "Generate Blog Content based on Topic and Outline in Rich Text Editor format",
    form: [
      {
        label: "Enter Your Blog Topic",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "Enter Blog Outline Here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Blog Topic Ideas",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/11497/11497893.png",
    slug: "blog-topic-idea",
    aiPrompt:
      "Generate top 5 Blog Topic Ideas in bullet point only, (no Description) based on Niche in Rich Text Editor format",
    form: [
      {
        label: "Enter Your Niche",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Youtube SEO Title",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language",
    category: "Youtube Tools",
    icon: "https://cdn-icons-png.flaticon.com/128/470/470703.png",
    slug: "youtube-seo-title",
    aiPrompt:
      "Give me Best SEO optimized high ranked 5 title ideas bullet wise only based on keywords and outline and give me result in HTML tags format",
    form: [
      {
        label: "Enter Your Youtube Video Topic Keyowords",
        field: "input",
        name: "keywords",
        required: true,
      },
      {
        label: "Enter Youtube Description Outline Here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Youtube Description",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language",
    category: "Youtube Tool",
    icon: "https://cdn-icons-png.flaticon.com/128/10885/10885098.png",
    slug: "youtube-description",
    aiPrompt:
      "Generate Youtube description with Emoji under 4-5 lines based on topic and outline in rich text editor format",
    form: [
      {
        label: "Enter Your Blog Topic/Title",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "Enter Youtube Outline Here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Youtube Tags",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language",
    category: "Youtube Tool",
    icon: "https://cdn-icons-png.flaticon.com/128/10884/10884882.png",
    slug: "youtube-tag",
    aiPrompt:
      "Generate 10 Youtube tags in bullet point based on title and outline in rich text editor format",
    form: [
      {
        label: "Enter Your Youtube Title",
        field: "input",
        name: "title",
        required: true,
      },
      {
        label: "Enter Youtube Video Outline Here (Optional)",
        field: "textarea",
        name: "outline",
      },
    ],
  },

  {
    name: "Rewrite Article (Plagiarism Free)",
    desc: "Use this tool to rewrite existing Article or Blog Post which can bypass AI detectors and also make it plagiarism free.",
    icon: "https://cdn-icons-png.flaticon.com/128/11145/11145716.png",
    category: "Rewriting Tool",
    slug: "rewrite-article",
    aiPrompt:
      "Rewrite given article without any Plagiarism in rich text editor format",
    form: [
      {
        label:
          "🤖 Provide your Article/Blogpost or any other content to rewrite",
        field: "textarea",
        name: "article",
        required: true,
      },
    ],
  },
  {
    name: "Text Improver",
    desc: "This handy tool refines your writing, eliminating errors and redundancies for a clear, readable result while offering a comprehensive tone analysis and suggesting better word choices",
    icon: "https://cdn-icons-png.flaticon.com/128/8361/8361342.png",
    category: "Writing Assistant",
    slug: "text-improver",
    aiPrompt:
      "Given textToImprove, Rewrite text without any grammar mistake and professionally in rich text editor format",
    form: [
      {
        label: "Enter Text That You Want to Re-write or Improve",
        field: "textarea",
        name: "textToImprove",
      },
    ],
  },
  {
    name: "Add Emojis to Text",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language",
    icon: "https://cdn-icons-png.flaticon.com/128/1470/1470501.png",
    category: "blog",
    slug: "add-emoji-to-text",
    aiPrompt:
      "Add Emoji to outline text depending on outline and rewrite it in rich text editor format",
    form: [
      {
        label: "Enter Your Text to Add Emojis",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post Generator",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language",
    icon: "https://cdn-icons-png.flaticon.com/128/15713/15713420.png",
    category: "blog",

    slug: "instagram-post-generator",
    aiPrompt:
      "Generate 3 Instagram posts depending on given keywords and give output in rich text editor format",
    form: [
      {
        label: "Enter Keywords For Your Post",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Hash Tag Generator",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.",
    icon: "https://cdn-icons-png.flaticon.com/128/18733/18733382.png",
    category: "blog",

    slug: "instagram-hash-tag-generator",
    aiPrompt:
      "Generate 15 Instagram hash tag depending on given keywords and give output in rich text editor format",
    form: [
      {
        label: "Enter Keywords For Your Instagram Hashtag",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post/Reel Idea",
    desc: "An AI tool that generate New and trending instagram idea depends on your niche",
    icon: "https://cdn-icons-png.flaticon.com/128/11820/11820224.png",
    category: "instagram",

    slug: "instagram-post-idea-generator",
    aiPrompt:
      "Generate 5-10 Instagram ideas depending on niche with latest trend and give output in rich text editor format",
    form: [
      {
        label: "Enter Keywords / Niche for Your Instagram Idea",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "English Grammer Check",
    desc: "AI Model to Correct your english grammer by providing the text",
    icon: "https://cdn-icons-png.flaticon.com/128/6749/6749535.png",
    category: "english",

    slug: "english-grammer-checker",
    aiPrompt:
      "Rewrite the inputText by correcting the grammer and give output in rich text editor format",
    form: [
      {
        label: "Enter Text to Correct the Grammer",
        field: "input",
        name: "inputText",
        required: true,
      },
    ],
  },
  {
    name: "Write Code",
    desc: "AI Model to generate programming code in any language",
    icon: "https://cdn-icons-png.flaticon.com/128/5972/5972200.png",
    category: "Coding",

    slug: "write-code",
    aiPrompt:
      "Depending on user's codeDescription write a code and give output in rich text editor format in code block ",
    form: [
      {
        label:
          "Enter Description of Code You Want Along with Programming Language",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Explain Code",
    desc: "AI Model to explain programming code in any language",
    icon: "https://cdn-icons-png.flaticon.com/128/8743/8743532.png",
    category: "Coding",

    slug: "explain-code",
    aiPrompt:
      "Depending on user's codeDescription explain code line by line and give output in rich text editor format in code block",
    form: [
      {
        label: "Enter Code Which You Want to Understand",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Code Bug Detector",
    desc: "This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in a straightforward, user-friendly way.",
    icon: "https://cdn-icons-png.flaticon.com/128/10435/10435126.png",
    category: "code-bug-detector",

    slug: "code-bug-detector",
    aiPrompt:
      "Depending on user's codeInput find bug in code and give solution and output in rich text editor format in code block",
    form: [
      {
        label: "Enter Code Which You Want to Test Bug",
        field: "textarea",
        name: "codeInput",
        required: true,
      },
    ],
  },
  {
    name: "Tagline Generator",
    desc: "Struggling to find the perfect tagline for your brand? Let our AI-tool assist you in creating a tagline that stands out",
    icon: "https://cdn-icons-png.flaticon.com/128/13966/13966010.png",
    category: "Marketting",

    slug: "tagline-generator",
    aiPrompt:
      "Depending on user's productName and outline generate catchy 5-10 taglines for the business product and give output in rich text editor format",
    form: [
      {
        label: "Product/Brand Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "What Are You Selling / Marketting",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Product Description",
    desc: "This is your AI-powered SEO expert, creating captivating and keyword-rich e-commerce product descriptions to boost your online sales",
    icon: "https://cdn-icons-png.flaticon.com/128/15605/15605334.png",
    category: "Marketting",

    slug: "product-description",
    aiPrompt:
      "Depending on user's productName and description generate small description for product for e-commerce business give output in rich text editor format ",
    form: [
      {
        label: "Product Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "Product Details",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
];
