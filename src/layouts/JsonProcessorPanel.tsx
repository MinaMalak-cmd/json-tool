import {
  Container,
  Grid,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import JsonInput from "./JsonInput";
import JsonOutput from "./JsonOutput";
import ErrorMessage from "../common/components/ErrorMessage";
import CopyButton from "../common/components/CopyButton";
import { useJsonProcessor } from "../common/hooks/useJsonProcessor";

export default function JsonProcessorPanel() {
  const {
    input,
    output,
    error,
    setInput,
    handleParse,
    handleStringify,
  } = useJsonProcessor();

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} mt={4}>
        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            variant="contained"
            onClick={handleParse}
          >
            Parse
          </Button>

          <Button
            variant="outlined"
            onClick={handleStringify}
          >
            Stringify
          </Button>

          <CopyButton value={output} />
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
              <JsonInput
                value={input}
                onChange={setInput}
              />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
              <JsonOutput
                value={output}
              />
            </Paper>
          </Grid>
        </Grid>

        <ErrorMessage message={error} />
      </Stack>
    </Container>
  );
}
