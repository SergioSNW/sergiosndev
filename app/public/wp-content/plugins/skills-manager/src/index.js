import "./index.scss";
import { useSelect } from "@wordpress/data";
import { tratarRecopSkills } from "./masterskills";

wp.blocks.registerBlockType("ourplugin/cv-skills", {
  title: "Skills for CV",
  description: "Recolect dinamicly skills to add Curriculum Vitae ",
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
  const skCourses = useSelect((select) => {
    return select("core").getEntityRecords("postType", "courses", {
      per_page: -1,
    });
  });

  const skJobs = useSelect((select) => {
    return select("core").getEntityRecords("postType", "jobs", {
      per_page: -1,
    });
  });

  if (skJobs == undefined || skCourses == undefined) return <p>Cargando ...</p>;
  console.log("carga de Jobs:", skJobs);
  console.log("carga de Courses:", skCourses);
  const mstSkills = tratarRecopSkills(skJobs.concat(skCourses));
  console.log("nuevo master: ", mstSkills);

  // const requestURL = "http://donalibros.jc/wp-json/wp/v2/libro";
  // const allSkills = prFetch(requestURL, "salida_Fetch");

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
          <option value="">Skill-type to include ...</option>
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
        <div>We will have a select dropdown form element here.</div>
      </div>
      <div>
        <p>
          Se supone que aqui se debe mostar el resultado de: viewTipo(allSkills,
          props.attributes.profId)
        </p>
      </div>
    </div>
  );
}
