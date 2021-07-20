import React from "react";
import { Button } from "@material-ui/core";
import GpfTextField from "./core/GpfTextfield";
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
      <GpfTextField
        id="dre"
        label="DRE"
        value={dre}
        onChange={setDre}
        required
      />
    );
  }

  function showTeacherFields() {
    return (
      <>
        <GpfTextField
          id="siape"
          label="SIAPE"
          value={siape}
          onChange={setSiape}
        />
        <GpfTextField
          id="title"
          label="Título"
          value={title}
          onChange={setTitle}
        />
        <GpfTextField
          id="position"
          label="Posição"
          value={position}
          onChange={setPosition}
        />
        <GpfTextField id="room" label="Sala" value={room} onChange={setRoom} />
        <GpfTextField
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
      <GpfTextField
        id="name"
        label="Nome"
        value={name}
        onChange={setName}
        required
      />
      <GpfTextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />
      <GpfTextField
        id="gender"
        label="Gênero"
        value={gender}
        onChange={setGender}
        required
      />
      <GpfTextField
        id="lattes"
        label="Lattes"
        value={lattes}
        onChange={setLattes}
      />
      <GpfTextField
        id="course"
        label="Curso"
        value={course}
        onChange={setCourse}
        required
      />
      <GpfTextField
        id="origin"
        label="Local de origem"
        value={origin}
        onChange={setOrigin}
        required
      />
      {showFieldsByUserType()}
      <GpfTextField
        id="password"
        label="Senha"
        type="password"
        value={password}
        onChange={setPassword}
        required
      />
      <GpfTextField
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
