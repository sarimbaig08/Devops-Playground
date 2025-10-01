import { useState } from 'react';

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'cicd', name: 'CI/CD', count: 8 },
    { id: 'containers', name: 'Containers', count: 6 },
    { id: 'cloud', name: 'Cloud', count: 5 },
    { id: 'automation', name: 'Automation', count: 5 }
  ];

  const articles = [
    {
      id: 1,
      title: "Getting Started with Docker Containers",
      excerpt: "Learn the fundamentals of containerization and how Docker revolutionizes application deployment.",
      category: "containers",
      readTime: "8 min read",
      level: "Beginner",
      tags: ["Docker", "Containers", "DevOps"]
    },
    {
      id: 2,
      title: "Building CI/CD Pipelines with GitHub Actions",
      excerpt: "Step-by-step guide to create automated deployment pipelines using GitHub Actions.",
      category: "cicd",
      readTime: "12 min read",
      level: "Intermediate",
      tags: ["GitHub Actions", "CI/CD", "Automation"]
    },
    {
      id: 3,
      title: "Kubernetes Deployment Strategies",
      excerpt: "Explore different deployment strategies in Kubernetes for zero-downtime releases.",
      category: "containers",
      readTime: "15 min read",
      level: "Advanced",
      tags: ["Kubernetes", "Deployment", "Containers"]
    },
    {
      id: 4,
      title: "Infrastructure as Code with Terraform",
      excerpt: "Learn how to manage cloud infrastructure using Terraform's declarative approach.",
      category: "automation",
      readTime: "10 min read",
      level: "Intermediate",
      tags: ["Terraform", "IaC", "Cloud"]
    },
    {
      id: 5,
      title: "AWS ECS vs EKS: Choosing the Right Container Service",
      excerpt: "Compare AWS container services and learn when to use ECS or EKS for your applications.",
      category: "cloud",
      readTime: "7 min read",
      level: "Intermediate",
      tags: ["AWS", "ECS", "EKS", "Containers"]
    },
    {
      id: 6,
      title: "Monitoring and Observability in DevOps",
      excerpt: "Implement comprehensive monitoring solutions using Prometheus, Grafana, and modern observability tools.",
      category: "automation",
      readTime: "14 min read",
      level: "Advanced",
      tags: ["Monitoring", "Prometheus", "Grafana"]
    },
    {
      id: 7,
      title: "GitOps Workflow with ArgoCD",
      excerpt: "Implement GitOps principles using ArgoCD for continuous deployment and configuration management.",
      category: "cicd",
      readTime: "11 min read",
      level: "Advanced",
      tags: ["GitOps", "ArgoCD", "CI/CD"]
    },
    {
      id: 8,
      title: "Securing Container Images and Runtime",
      excerpt: "Best practices for container security, from image scanning to runtime protection.",
      category: "containers",
      readTime: "9 min read",
      level: "Intermediate",
      tags: ["Security", "Containers", "DevSecOps"]
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            DevOps <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive guides, tutorials, and best practices to accelerate your DevOps learning journey.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 group overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(article.level)}`}>
                    {article.level}
                  </span>
                  <span className="text-sm text-slate-500">{article.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {article.title}
                </h2>
                
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200">
                  Read More
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest DevOps Trends
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get weekly insights, tutorials, and industry news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;