import PitchVideo from "@/components/shared/PitchVideo";

export default function HowItWorks({ className }: { className?: string }) {
  return (
    <section
      className={`sm:pt-20 sm:pb-16 flex-center flex-col gap-10 ${className}`}
    >
      <h2 className="text-center h2-semibold leading-[40px]">How it works ?</h2>
      <h3 className="text-center xs:px-5">
        Imagine the impact on your sales volume if your customers could view
        your product before making a purchase.
      </h3>
      <PitchVideo />
    </section>
  );
}
