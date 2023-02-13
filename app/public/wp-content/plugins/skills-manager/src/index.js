import "./index.scss";

wp.blocks.registerBlockType("ourplugin/cv-skills", {
  title: "Skills for CV",
  description: "Recolect dinamicly skills to add Curriculum Vitae ",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    skillType: { type: "string" },
  },
  edit: EditComponent,
  save: function (props) {
    null;
  },
});

function EditComponent(props) {
  const types = [
    { id: "cono", title: "Conocimientos" },
    { id: "habi", title: "Habilidades" },
    { id: "idio", title: "Idiomas" },
  ];

  return (
    <div>
      <div>
        <select
          onChange={(e) => props.setAttributes({ skillType: e.target.value })}
        >
          <option value="">-- Skill-type to include --</option>
          {types.map((item) => {
            return (
              <option
                value={item.id}
                selected={props.attributes.skillType == item.id}
              >
                {item.title}
              </option>
            );
          })}
        </select>
      </div>
        <div>
          This block will be refresh only when review the page
        </div>
        <hr></hr>
    </div>
  );
}
