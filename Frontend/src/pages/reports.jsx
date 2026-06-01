import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Reports() {
  return (
    <>
      <Navbar />
      <main className="grow w-full">
        {/* <PageHeader /> */}
        <div className="layout-grid">
          <section aria-label="Formulario principal">
            {/* <IncidentDetailsForm />
            <EvidenceUploadForm /> */}
          </section>
          <aside aria-label="Datos del denunciante">
            {/* <PrivacyNoticeCard />
            <PersonalDataForm />
            <SubmitButton /> */}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Reports;