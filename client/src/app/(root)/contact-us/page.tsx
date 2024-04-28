import { ContactUsForm } from "./components/ContactUsForm";
import { Animation } from "@/components/shared/Animation";

export default function ContactUs() {
  return (
    <Animation className="snap-end">
      <div className="h-[calc(100vh-60px)] snap-end flex justify-center flex-col gap-6 max-xs:max-h-[500px]">
        <div className="text-center">
          <h1 className="h1-semibold mb-2 text-black">Contact Us</h1>
        </div>
        <ContactUsForm />
      </div>
    </Animation>
  );
}
