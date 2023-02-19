import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface Task {
  name: string;
  description: string;
}

interface TaskFormProps {
  task?: Task;
  onSubmit: (form: Task) => void;
}

function TaskForm(props: TaskFormProps) {
  const [form, setForm] = useState<Task>({ name: '', description: '' });

  useEffect(() => {
    if (props.task) {
      setForm({
        name: props.task.name,
        description: props.task.description,
      });
    }
  }, [props.task]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(form);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Task name"
          variant="filled"
          value={form.name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div>
        <TextField
          
          label="Description"
          variant="filled"
          multiline
          rows={4}
          value={form.description}
          onChange={handleDescriptionChange}
          required
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={(e) => {
          handleSubmit(e)
        }
      }>
        Submit
      </Button>
    </Box>
  );
}

export default TaskForm;