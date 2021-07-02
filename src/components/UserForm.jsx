import React from "react";
import { Button } from "@material-ui/core";
import Textfield from "./Textfield";
import { useState } from "react";

function UserForm({ user, buttonText, onSubmit }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dre, setDre] = useState(user.dre);
  const [siape, setSiape] = useState(user.siape);
  const [gender, setGender] = useState(user.gender);
  const [title, setTitle] = useState(user.title);
  const [position, setPosition] = useState(user.position);
  const [room, setRoom] = useState(user.room);
  const [lattes, setLattes] = useState(user.lattes);
  const [userProfile, setUserProfile] = useState(user.userProfile);
  const [course, setCourse] = useState(user.course);
  const [origin, setOrigin] = useState(user.origin);

  function showFieldsByUserType() {
    if (user.userType === "STUDENT") {
      return showStudentFields();
    } else {
      return showTeacherFields();
    }
  }

  function showStudentFields() {
    return (
      <>
        <Textfield
          id="dre"
          label="DRE"
          value={dre}
          onChange={setDre}
          required
        />
      </>
    );
  }

  function showTeacherFields() {
    return (
      <>
        <Textfield id="siape" label="SIAPE" value={siape} onChange={setSiape} />
        <Textfield
          id="title"
          label="Título"
          value={title}
          onChange={setTitle}
        />
        <Textfield
          id="position"
          label="Posição"
          value={position}
          onChange={setPosition}
        />
        <Textfield id="room" label="Sala" value={room} onChange={setRoom} />
        <Textfield
          id="user_profile"
          label="Página pessoal"
          value={userProfile}
          onChange={setUserProfile}
        />
      </>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        user.name = name;
        user.email = email;
        user.password = password;
        user.dre = dre;
        user.siape = siape;
        user.title = title;
        user.position = position;
        user.room = room;
        user.lattes = lattes;
        user.userProfile = userProfile;
        user.course = course;
        user.origin = origin;
        user.gender = gender;
        onSubmit(user);
      }}
    >
      <Textfield
        id="name"
        label="Nome"
        value={name}
        onChange={setName}
        required
      />
      <Textfield
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />
      <Textfield
        id="gender"
        label="Gênero"
        value={gender}
        onChange={setGender}
        required
      />
      <Textfield
        id="lattes"
        label="Lattes"
        value={lattes}
        onChange={setLattes}
      />
      <Textfield
        id="course"
        label="Curso"
        value={course}
        onChange={setCourse}
        required
      />
      <Textfield
        id="origin"
        label="Local de origem"
        value={origin}
        onChange={setOrigin}
        required
      />
      {showFieldsByUserType()}
      <Textfield
        id="password"
        label="Senha"
        type="password"
        value={password}
        onChange={setPassword}
        required
      />
      <Textfield
        id="password_confirmation"
        label="Confirmar senha"
        type="password"
        value={passwordConfirmation}
        onChange={setPasswordConfirmation}
        required
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        {buttonText}
      </Button>
    </form>
  );
}

export default UserForm;
