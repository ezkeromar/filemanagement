import Hero from "./components/Hero";
import PricePlan from "./components/PricePlan";
import { pricingPlans } from "@/constants";
import { Animation } from "@/components/shared/Animation";
import EnterprisePricing from "./components/EnterprisePricing";
import Accordion from "./components/Accordions";

export default function Pricing() {
  const sectionStyles = " snap-center";

  return (
    <>
      <Animation className="snap-end">
        <Hero className=" snap-end max-xs:max-h-[500px]" />
      </Animation>
      {pricingPlans.map((plan, index) => (
        <Animation key={index}>
          <section
            className={`flex-center flex-col gap-6 pt-10 ${sectionStyles}`}
          >
            <PricePlan pricing={plan.pricing}>{plan.title}</PricePlan>
          </section>
        </Animation>
      ))}
      <Animation >
        <EnterprisePricing className="  snap-center" />
      </Animation>
      <Animation >
        <Accordion className=" min-h-screen snap-center" />
      </Animation>
    </>
  );
}
