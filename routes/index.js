const { Router } = require("express");
const router = Router();
const { get, run } = require("./../services/db");

//APIs

// GET

router.get("/", async (request, response, next) => {
  try {
    const toDos = await get("SELECT * FROM todos");
    const data = toDos.map((toDo) => {
      return {
        id: toDo.id,
        title: toDo.title,
        description: toDo.description,
        isDone: Boolean(toDo.isDone),
        creationDate: toDo.creation_date,
        lastModificationDate: toDo.modified_date,
      };
    });
    response
      .status(200)
      .json({ message: "To-dos retrieved sucessfully", data });
  } catch (error) {
    response.status(500).json({ message: "Hay un error de servidor", error });
  }
});

// POST

router.post("/", async (request, response, next) => {
  try {
    const { title, description } = request.body;
    const data = await run(
      "INSERT INTO todos (title, description, creation_date) VALUES(?, ?, DATETIME('now', 'localtime'))",
      [title, description]
    );
    const getCreationDate = await get("SELECT creation_date FROM todos");
    // console.log(getCreationDate);
    // console.log(data);
    response.status(200).json({
      message: "To-do created sucessfully",
      toDo: {
        id: data.lastID,
        title,
        description,
        isDone: false,
        creationDate: getCreationDate[getCreationDate.length - 1].creation_date,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Hay un error de servidor", error });
  }
});

// PUT

router.patch("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const toDo = await get("SELECT * FROM todos WHERE id = ?", [id]);
    if (toDo.length === 0) {
      return response
        .status(404)
        .json({ message: "el ID no se encuentra en la db" });
    }

    const { title, description, isDone } = request.body;
    const isDoneNumber = Number(isDone);
    await run(
      "UPDATE todos SET title = ?, description = ?, isDone = ?, modified_date = DATETIME('now', 'localtime')  WHERE id = ?",
      [title, description, isDoneNumber, id]
    );
    const getModificationDate = await get("SELECT modified_date FROM todos");
    response.status(200).json({
      message: "To-do updated succesfully",
      toDo: {
        id,
        title,
        description,
        isDone,
        ModificationDate:
          getModificationDate[getModificationDate.length - 1].modified_date,
      },
    });
  } catch (error) {
    response
      .status(200)
      .json({ message: `el usuario ID:${id} ha sido modificado` });
  }
});

// DELETE

router.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const toDo = await get("SELECT * FROM todos WHERE id = ?", [id]);
    if (toDo.length === 0) {
      return response
        .status(404)
        .json({ message: `el usuario con ID:${id} no se encuentra en la db` });
    }

    await run("DELETE FROM todos WHERE id = ?", [id]);
    console.log(toDo);
    response.status(200).json({
      message: "To-do deleted successfully",
      todo: {
        id: toDo[0].id,
        title: toDo[0].title,
        description: Boolean(toDo[0].isDone),
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "error en el servidor", error });
  }
});

module.exports = router;
