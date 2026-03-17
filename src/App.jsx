import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  addHabit,
  clearCompleted,
  deleteHabit,
  setFilterCategory,
  toggleHabit,
  updateHabit,
} from './store/habitsSlice'

function App() {
  const dispatch = useDispatch()
  const { habits, filterCategory, defaultCategories } = useSelector(
    (state) => state.habits,
  )

  const [newHabitName, setNewHabitName] = useState('')
  const [newHabitCategory, setNewHabitCategory] = useState('saúde')
  const [editingHabit, setEditingHabit] = useState(null)
  const [editName, setEditName] = useState('')
  const [editCategory, setEditCategory] = useState('')

  const categories = useMemo(() => {
    const dynamicCategories = habits.map((habit) => habit.category)
    return Array.from(new Set([...defaultCategories, ...dynamicCategories]))
  }, [defaultCategories, habits])

  const filteredHabits = useMemo(() => {
    if (filterCategory === 'todas') {
      return habits
    }

    return habits.filter((habit) => habit.category === filterCategory)
  }, [filterCategory, habits])

  const completedCount = habits.filter((habit) => habit.completed).length

  const handleAddHabit = (event) => {
    event.preventDefault()
    if (!newHabitName.trim() || !newHabitCategory.trim()) {
      return
    }

    dispatch(addHabit({ name: newHabitName, category: newHabitCategory }))
    setNewHabitName('')
  }

  const openEditDialog = (habit) => {
    setEditingHabit(habit)
    setEditName(habit.name)
    setEditCategory(habit.category)
  }

  const closeEditDialog = () => {
    setEditingHabit(null)
    setEditName('')
    setEditCategory('')
  }

  const handleSaveEdit = () => {
    if (!editingHabit || !editName.trim() || !editCategory.trim()) {
      return
    }

    dispatch(
      updateHabit({ id: editingHabit.id, name: editName, category: editCategory }),
    )
    closeEditDialog()
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Controle de Hábitos Diários
              </Typography>
              <Typography color="text.secondary">
                Organize sua rotina com Redux e Material UI.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleAddHabit}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Nome do hábito"
                  value={newHabitName}
                  onChange={(event) => setNewHabitName(event.target.value)}
                />
                <FormControl sx={{ minWidth: 180 }}>
                  <InputLabel id="new-habit-category-label">Categoria</InputLabel>
                  <Select
                    labelId="new-habit-category-label"
                    label="Categoria"
                    value={newHabitCategory}
                    onChange={(event) => setNewHabitCategory(event.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained">
                  Adicionar
                </Button>
              </Stack>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel id="filter-category-label">Filtrar por categoria</InputLabel>
                <Select
                  labelId="filter-category-label"
                  label="Filtrar por categoria"
                  value={filterCategory}
                  onChange={(event) => dispatch(setFilterCategory(event.target.value))}
                >
                  <MenuItem value="todas">todas</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCompleted())}
                disabled={completedCount === 0}
              >
                Limpar concluídos
              </Button>

              <Chip
                color="success"
                label={`${completedCount} concluído(s)`}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
              />
            </Stack>

            {filteredHabits.length === 0 ? (
              <Alert severity="info">
                Nenhum hábito encontrado para o filtro selecionado.
              </Alert>
            ) : (
              <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                {filteredHabits.map((habit) => (
                  <ListItem key={habit.id} divider>
                    <Checkbox
                      checked={habit.completed}
                      onChange={() => dispatch(toggleHabit(habit.id))}
                    />
                    <ListItemText
                      primary={habit.name}
                      secondary={`Categoria: ${habit.category}`}
                      sx={{
                        textDecoration: habit.completed ? 'line-through' : 'none',
                        opacity: habit.completed ? 0.6 : 1,
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="editar"
                        onClick={() => openEditDialog(habit)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="deletar"
                        color="error"
                        onClick={() => dispatch(deleteHabit(habit.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={Boolean(editingHabit)} onClose={closeEditDialog} fullWidth>
        <DialogTitle>Editar hábito</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nome do hábito"
              value={editName}
              onChange={(event) => setEditName(event.target.value)}
              fullWidth
            />

            <TextField
              label="Categoria"
              value={editCategory}
              onChange={(event) => setEditCategory(event.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancelar</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default App
