import Form from "@/components/Form";
import IconSection from "@/components/IconSection";
import Logo from "@/components/Logo";

export default function UserLookup() {
  return (
    <>
      <div className="page-wrapper bg-white rounded">
        <Logo />
        <div className="max-width-600">
          <Form />
        </div>
      </div>
      <IconSection />
    </>
  );
}
