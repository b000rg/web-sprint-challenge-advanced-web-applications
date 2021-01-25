import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { connect } from "react-redux";
import { changeColor, deleteColor } from "../actions/actions";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = (props) => {
  console.log(props.colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    let colorId = props.colors.find(
      (color) => color.color === colorToEdit.color
    ).id;
    props.changeColor(props.token, colorId, { ...colorToEdit, id: colorId });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    props.deleteColor(props.token, color.id);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { colors: state.colorList, token: state.token };
};

export default connect(mapStateToProps, { changeColor, deleteColor })(
  ColorList
);
