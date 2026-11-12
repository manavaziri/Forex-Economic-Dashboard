import ShowTable from "./ShowTable";
function MainContent({ activeSection, economicData }) {

  return (
    <main className="main-content">

      {activeSection === "economic" && (
        <ShowTable
          title="Economic Data"
          data={economicData}
          headers={[
            "Date", "Currency", "Title", "Case",
            "Mean3", "Mean6", "Imp", "Country"
          ]}
          fields={[
            "Daten", "Currency", "Title", "Case",
            "Mean3", "Mean6", "Imp", "Country"
          ]}
          rowKey="Title"
          rowKeyFields={["Currency", "Title"]}
          sortableFields={[
            "Daten", "Currency", "Case",
            "Mean3", "Mean6", "Imp", "Country"
          ]}
          numericFields={["Mean3", "Mean6", "Imp"]}
        />
      )}

      {activeSection === "comparison" && (
        <h2>Comparison</h2>
      )}

      {activeSection === "analysis" && (
        <h2>Analysis</h2>
      )}

      {activeSection === "news" && (
        <h2>News</h2>
      )}

    </main>
  );
}

export default MainContent;