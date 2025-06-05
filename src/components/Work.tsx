import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  {
    title: "Shoe Mania",
    type: "Website",
    tools: "JavaScript, TypeScript, React, HTML",
    image: "/images/shoe.webp",
    href: "https://shoemania.example.com",
  },
  {
    title: "Portfolio",
    type: "Personal Site",
    tools: "Next.js, Tailwind CSS",
    image: "/images/portfolioimg.webp",
    href: "https://portfolio.example.com",
  },
  {
    title: "Expense Tracker  App",
    type: "Mobile App",
    tools: "Java, Xml, Firebase",
    image: "/images/expensetracker.webp",
    href: "https://expensetracker.example.com",
  },
  {
    title: "Movie recommendation system",
    type: "web App",
    tools: "Python, Pandas, ML",
    image: "/images/movierecommendationsystem.webp",
    href: "https://movierecommendation.example.com",
  },
  {
    title: "DevSearch",
    type: "Website",
    tools: "Reactjs, Html, CSS, Django",
    image: "/images/devsearch.webp",
    href: "https://devsearch.example.com",
  },
  {
    title: "Weather Checker ",
    type: "Website",
    tools: "React, JavaScript",
    image: "/images/weather application.webp",
    href: "https://weather-app-bay-ten-74.vercel.app/",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding || "0") / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {workItems.map((item, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.type}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{item.tools}</p>
              </div>
              <a href={item.href}>
              <WorkImage image={item.image} alt={item.title} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
