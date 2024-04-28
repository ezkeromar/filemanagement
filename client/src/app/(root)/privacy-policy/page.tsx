import { Animation } from "@/components/shared/Animation";
import { privacyPolicyDefinition, privacyPolicyQuestions } from "./policy";

export default function PoliciesPage() {
  return (
    <>
      <Animation className="snap-end">
        <section className="mt-28 mb-10 snap-end flex-center flex-col gap-10 lg:px-20 max-xs:max-h-[500px]">
          <h1 className="!text-[45px] !leading-[60px] text-black font-bold">Privacy Policy</h1>
          <p className="text-center text-gray-900">{privacyPolicyDefinition}</p>
        </section>
      </Animation>
      <Animation>
        {privacyPolicyQuestions.map((qst, index1) => (
          <section
            key={index1}
            className=" snap-center flex-col gap-6 lg:px-20 py-3"
          >
            <h2 className="text-start font-bold mb-4 text-gray-900">{qst.title}</h2>
              <ul className="list-disc space-y-2 pl-4">
                {qst.answers.map((answer, index2) => (
                  <li key={index2} className=" text-gray-500">
                    {answer}
                  </li>
                ))}
              </ul>
          </section>
        ))}
      </Animation>
    </>
  );
}
