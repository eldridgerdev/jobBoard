import { Box, Container, Stack, Typography } from "@mui/material";

export default function Hero(): Element {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Job&nbsp;Hunter
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
