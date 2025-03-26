
import Hero from "@/components/Hero/Hero";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import BenefitsSlider from "@/components/BenefitsSlider/BenefitsSlider";
import DeliverySteps from "@/components/DeliverySteps/DeliverySteps";
import ReviewsBlock from "@/components/ReviewsBlock/ReviewsBlock";
import RequestForm from "@/components/RequestForm/RequestForm";

export default function Home() {
  return (
    
    <div>
     <Hero/>
     <WhyChooseUs/>
     <BenefitsSlider/>
     <DeliverySteps/>
     <ReviewsBlock/>
     <RequestForm/>
    </div>
  );
}
