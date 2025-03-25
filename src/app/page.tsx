import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import BenefitsSlider from "@/components/BenefitsSlider/BenefitsSlider";

export default function Home() {
  return (
    
    <div>
     <Hero/>
     <WhyChooseUs/>
     <BenefitsSlider/>
    </div>
  );
}
