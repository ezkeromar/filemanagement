import { Animation } from "@/components/shared/Animation";

export default function AboutPage() {
  return (
    <Animation className="snap-end">
      <section className="h-[calc(100vh-60px)] snap-end flex-center flex-col gap-9 lg:px-20 max-xs:max-h-[500px]">
        <h1 className="!text-[45px] !leading-[60px]">About Us</h1>
        <p className="text-center">
          AR DISPLAY is a saas product that allows sellers to display their
          products in 3D using augmented reality. By providing customers with a
          realistic view of the product, AR DISPLAY aims to reduce return rates
          and increase conversion rates. With AR DISPLAY, customers can
          visualize the product in their own environment, allowing them to make
          more informed purchasing decisions.
        </p>
      </section>
    </Animation>
  );
}
