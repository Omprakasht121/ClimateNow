import { ExternalLink, Newspaper } from "lucide-react";

const NewsCard = ({ newsData, loading }) => {
    if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="bg-white rounded-2xl h-80 animate-pulse border"
            />
          ))}
        </div>
    );
  }

  const articles = newsData.articles;
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Newspaper className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Weather & Climate News</h2>
      </div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg flex flex-col hover:scale-105 hover:border-gray-500/40 transition-transform duration-300 ease-in-out"
            >
              <div className="h-56 md:h-64 overflow-hidden ">
                <img
                  src={
                    article.image ||
                    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                  }
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold line-clamp-2 mb-2">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {article.description}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xs text-slate-400">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm flex items-center gap-1"
                  >
                    Read more <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default NewsCard;
