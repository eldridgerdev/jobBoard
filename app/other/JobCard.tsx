import {
  CardActionArea,
  CardActions,
  Collapse,
  IconButton,
  IconButtonProps,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useOpenAI } from "../hooks/getAIResponse";

interface Job {
  id: string;
  title: string;
  description: string;
}

interface ExpandDescProps extends IconButtonProps {
  expand: boolean;
}

const JobDescription = ({ job }) => {
  const { message, isLoading, error } = useOpenAI(job.description);

  if (isLoading) {
    return "Retrieving job description...";
  }
  if (error) {
    return "Error retrieving job description";
  }

  return message;
};

const ExpandDesc = styled((props: ExpandDescProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function JobCard({ job }: { job: Job }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }} onClick={handleExpandClick}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            {job.title}
          </Typography>
          <Typography>Company Name Here</Typography>
          <CardActions disableSpacing>
            <ExpandDesc
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show description"
            >
              <ExpandMoreIcon />
            </ExpandDesc>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography
                sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
              >
                <JobDescription job={job} />
              </Typography>
            </CardContent>
          </Collapse>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
