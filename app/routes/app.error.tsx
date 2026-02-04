import { Page, Card, Button, BlockStack, Text } from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Redirect back to auth flow
    window.location.href = "/auth/login";
  };

  return (
    <Page title="Installation Error">
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              Something went wrong
            </Text>
            <Text variant="bodyMd" as="p" tone="subdued">
              We encountered an error during the installation process. This usually happens when:
            </Text>
            <ul style={{ marginLeft: "1.5rem" }}>
              <li>OAuth authentication failed or was cancelled</li>
              <li>Required permissions were not granted</li>
              <li>Network connection was interrupted</li>
            </ul>
            <BlockStack gap="300">
              <Button onClick={handleRetry} variant="primary">
                Try installing again
              </Button>
              <Button
                variant="plain"
                url="mailto:support@example.com"
                external
              >
                Contact support
              </Button>
            </BlockStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
