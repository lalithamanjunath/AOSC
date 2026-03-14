import { useState } from "react";

import article01 from "../assets/article01.jpg";
import article02 from "../assets/article02.png";

function Articles() {

  const articles = [
    {
      id: 1,
      title: "Why Every Developer Should Build Something From Scratch at Least Once.",
      description : "For a long time, I thought being a good developer meant knowing the right tools. The right framework. The right stack.I felt like I was doing fine. Looking back, I was mostly on the surface...",
      image: article01,
      link: "https://swanjithak.blogspot.com/2026/02/why-every-developer-should-build.html",
    },
    {
      id: 2,
      title: "Garbage In, Garbage Out: The Hidden Bottleneck in Modern Systems",
      description : "I work in a field obsessed with smart technology.Everywhere I look, people are talking about Artificial Intelligence, analytics dashboards, automation platforms, and recommendation engines...",
      image: article02,
      link: "https://yogeshwara0.blogspot.com/2026/02/garbage-in-garbage-out-hidden.html",
    }
  ];

  const [heroArticle, setHeroArticle] = useState(articles[0]);

  return (
    <div className="px-12 py-12">

      

      <div className="flex gap-8">

        {/* HERO ARTICLE */}
        <div
          key={heroArticle.id}
          className="flex-[0.6] bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-500"
        >

          <img
            src={heroArticle.image}
            alt={heroArticle.title}
            className="w-full h-[500px] object-cover transition-all duration-500"
          />

          <div className="p-6">

            <h2 className="text-2xl font-semibold mb-3">
              {heroArticle.title}
            </h2>

            <a
              href={heroArticle.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline mt-3 inline-block"
            >
              Read Article →
            </a>

          </div>

        </div>


        {/* SUB-SECTION ARTICLES */}
        <div className="flex-[0.4] flex flex-col gap-4">

          {articles
            .filter(article => article.id !== heroArticle.id)
            .map(article => (

              <div
                key={article.id}
                onClick={() => setHeroArticle(article)}
                className="flex gap-3 bg-white shadow rounded-lg p-3 cursor-pointer 
                hover:shadow-lg hover:scale-[1.02] transition duration-300"
              >

                <img
                  src={article.image}
                  alt={article.title}
                  className="w-24 h-20 object-cover rounded"
                />
                <div className="flex flex-col"> 
                 <h3 className="text-sm font-semibold leading-snug">
                  {article.title}
                 </h3>

                 <p className="text-xs text-gray-500 mt-1">
                   {article.description}
                 </p>
                </div>

              </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Articles;