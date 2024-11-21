"use client";
import {
  CardActionArea,
  CardActions,
  Collapse,
  Icon,
  IconProps,
  styled,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { PropsWithChildren } from "react";
import { Job } from "./types";

interface ExpandDescProps extends PropsWithChildren, IconProps {
  expand: boolean;
}

const ExpandDesc = styled((props: ExpandDescProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...iconProps } = props;
  return <Icon {...iconProps} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }: ExpandDescProps) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }: ExpandDescProps) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

interface JobCardProps {
  job: Job;
  skipAi?: boolean;
  onSpecialClick?: Function;
}

export default function JobCard({
  job,
  onSpecialClick = () => {},
}: JobCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    if (job.special) {
      onSpecialClick();
    } else {
      setExpanded(!expanded);
    }
  };
  /*
  const JobDescription = ({ description }: { description: string }) => {
    const { message, isLoading, error } = useAI(description);

    if (isLoading) {
      return "Retrieving job description...";
    }
    if (error) {
      return "Error retrieving job description";
    }

    return message;
  };
*/
  const AIDesc = () => {
    /*
    if (!skipAi) {
      return <JobDescription description={job.description} />;
    }*/

    return <span>{job.description}</span>;
  };

  return (
    <Card
      variant={job.special ? "elevation" : "outlined"}
      sx={{
        bgcolor: job.special ? "success.dark" : null,
        minWidth: 275,
      }}
      onClick={handleExpandClick}
      raised={job.special}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            {job.title}
          </Typography>
          <Typography>{job.company}</Typography>
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
                <AIDesc />
              </Typography>
            </CardContent>
          </Collapse>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
