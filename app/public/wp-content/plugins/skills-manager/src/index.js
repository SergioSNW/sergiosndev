import "./index.scss";
import { useSelect } from "@wordpress/data";
import { prFetch, viewTipo } from "./masterskills";

wp.blocks.registerBlockType("ourplugin/cv-skills", {
  title: "Skills for CV",
  description:
    "Recolect dinamicly skills to add Curriculum Vitae ",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    profId: { type: "string" },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  // const allProfs = useSelect((select) => {
  //   return select("core").getEntityRecords("postType", "professor", {
  //     per_page: -1,
  //   });
  // });

  const requestURL = "http://donalibros.jc/wp-json/wp/v2/libro";
  const allSkills = prFetch(requestURL, "salida_Fetch");

  // if (allSkills == undefined) return <p>Cargando ...</p>;

  console.log("ha pasado el if");

  const allProfs = [
    { id: "cono", title: "Conocimientos" },
    { id: "habi", title: "Habilidades" },
    { id: "idio", title: "Idiomas" },
  ];

  return (
    <div>
      <div>
        <select
          onChange={(e) => props.setAttributes({ profId: e.target.value })}
        >
          <option value="">Selecciona un profesor ...</option>
          {allProfs.map((prof) => {
            return (
              <option
                value={prof.id}
                selected={props.attributes.profId == prof.id}
              >
                {console.log(prof.title.rendered)}
                {prof.title}
              </option>
            );
          })}
        </select>
        We will have a select dropdown form element here.
      </div>
      <div>
        <p>Se supone que aqui se debe mostar el resultado de: viewTipo(allSkills, props.attributes.profId)</p>
      </div>
    </div>
  );
}
