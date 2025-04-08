import {
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack
} from '@mui/material';
import {useState} from 'react';
import {format, addDays, startOfWeek, addWeeks} from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';

interface Task {
    title: string;
    time: string;
}

export default function WeekViewPage() {
    const [weekOffset, setWeekOffset] = useState(0);
    const baseDate = addWeeks(new Date(), weekOffset);
    const weekStart = startOfWeek(baseDate, {weekStartsOn: 1});
    const weekDays = Array.from({length: 7}, (_, i) => addDays(weekStart, i));

    const [tasks, setTasks] = useState<Record<string, Task[]>>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [newTask, setNewTask] = useState<{ title: string; time: string }>({title: '', time: ''});

    const handleOpenDialog = (dayKey: string) => {
        setSelectedDay(dayKey);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setNewTask({title: '', time: ''});
    };

    const handleAddTask = () => {
        if (!newTask.title || !newTask.time || !selectedDay) return;
        setTasks((prev) => ({
            ...prev,
            [selectedDay]: [...(prev[selectedDay] || []), newTask],
        }));
        handleCloseDialog();
    };

    return (
        <Box display="flex">
            {/* Sidebar */}
            <Box
                sx={{
                    width: 80,
                    backgroundColor: '#2f3a4f',
                    minHeight: '100vh',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 2,
                    gap: 2,
                    color: 'white',
                    position: 'sticky',
                    top: 0,
                }}
            >
                <Box>
                    <AccessTimeIcon fontSize="large" />
                    <Typography>Hours</Typography>
                </Box>
                <Box>
                    <CheckCircleIcon fontSize="large" />
                    <Typography>Projects</Typography>
                </Box>
                <Box>
                    <BarChartIcon fontSize="large" />
                    <Typography>Reports</Typography>
                </Box>
            </Box>

            <Box flex={1} maxHeight="100vh" overflow="auto" p={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <IconButton onClick={() => setWeekOffset((w) => w - 1)}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h5">Week of {format(weekStart, 'MMM dd, yyyy')}</Typography>
                    <IconButton onClick={() => setWeekOffset((w) => w + 1)}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </Stack>

                <Stack
                    direction="row"
                    sx={{overflowX: 'auto', width: '100%'}}
                >
                    {weekDays.map((day) => {
                        const dayKey = format(day, 'yyyy-MM-dd');
                        return (
                            <Box key={dayKey} sx={{flex: '1 1 100%', border: '1px solid grey'}} minWidth={140}>
                                <Typography variant="h6">{format(day, 'EEE, MMM dd')}</Typography>
                                <List dense>
                                    {(tasks[dayKey] || []).map((task, idx) => (
                                        <ListItem key={idx} disablePadding>
                                            <ListItemText primary={task.title} secondary={task.time}/>
                                        </ListItem>
                                    ))}
                                </List>
                                <IconButton size="small" onClick={() => handleOpenDialog(dayKey)}>
                                    <AddIcon fontSize="small"/>
                                </IconButton>
                            </Box>
                        );
                    })}
                </Stack>

                <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
                    <DialogTitle>New Task</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} mt={1}>
                            <TextField
                                label="Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            />
                            <TextField
                                label="Time"
                                placeholder="e.g. 14:00–15:30"
                                value={newTask.time}
                                onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleAddTask} variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
