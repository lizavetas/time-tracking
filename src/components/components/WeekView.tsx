import  { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Typography, Button, Stack } from '@mui/material'
import {
    startOfWeek,
    addDays,
    format,
    addWeeks,
    subWeeks,
    isSameDay
} from 'date-fns'

const entries = [
    {
        title: 'Task 1',
        time: '9:00 am – 10:00 am',
        duration: '1:00',
        date: new Date(2025, 2, 24)
    },
    {
        title: 'Task 1',
        time: '10:00 am – 2:30 pm',
        duration: '4:30',
        date: new Date(2025, 2, 25)
    },
    {
        title: 'Task 3',
        time: '9:00 am – 1:25 pm',
        duration: '4:25',
        date: new Date(2025, 2, 26)
    }
]

export default function WeekView() {
    const [currentWeek, setCurrentWeek] = useState(new Date())

    const start = startOfWeek(currentWeek, { weekStartsOn: 1 })
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i))

    return (
        <Box p={2}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
                <Button onClick={() => setCurrentWeek(d => subWeeks(d, 1))}>← Prev</Button>
                <Typography variant='h6'>
                    {format(start, 'MMM dd')} – {format(addDays(start, 6), 'MMM dd, yyyy')}
                </Typography>
                <Button onClick={() => setCurrentWeek(d => addWeeks(d, 1))}>Next →</Button>
            </Stack>

            <Grid container spacing={2}>
                {days.map((day, i) => (
                    <Grid  sx={{ minWidth: 140, flex: 1 }} key={i}>
                        <Box>
                            <Typography variant='subtitle1' align='center'>
                                {format(day, 'EEE dd')}
                            </Typography>

                            <Box mt={2}>
                                {entries
                                    .filter(e => isSameDay(e.date, day))
                                    .map((entry, j) => (
                                        <Box
                                            key={j}
                                            mb={2}
                                            p={1}
                                            border={1}
                                            borderRadius={1}
                                        >
                                            <Typography variant='body2'>{entry.title}</Typography>
                                            <Typography variant='caption'>
                                                {entry.time} ({entry.duration})
                                            </Typography>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
