---
sidebar_position: 3
title: Create Your First Button
---

# Create Your First Button

In this guide, we'll create a custom button that appears in Graylog log rows.

## Scenario

Let's create a button that navigates to the user admin panel when a `userId` field is found in a log row.

## Step 1: Create a Button

1. Open the **Settings** page
2. Go to the **"Buttons"** tab
3. Click **"Add Button"**

## Step 2: Fill in Button Details

### Basic Information

| Field | Value |
|-------|-------|
| **Label** | `View User` |
| **URL Template** | `https://admin.company.com/users/{userId}` |
| **Color** | `primary` (blue) |

### URL Template Syntax

URL templates use `{placeholder}` syntax. Text inside curly braces is matched against field names in the log row.

```
https://admin.company.com/users/{userId}
                                ^^^^^^^^
                                Value of the "userId" field from the log row
```

You can use multiple placeholders:

```
https://admin.company.com/orders/{orderId}?user={userId}&env={environment}
```

## Step 3: Field Bindings

When you type `{userId}` in the URL template, Graytool automatically creates a field binding:

| Placeholder | Field Path | Fallback Paths |
|-------------|-----------|----------------|
| `userId` | `userId` | `context.userId`, `user_id` |

**Field Path** is the field name to search for in the log row's JSON data. **Fallback Paths** are alternative field paths to try if the primary one is not found.

### Nested Fields

Use dot notation for nested fields in JSON data:

```
{context.user.id}     → context.user.id value in JSON
{metadata.requestId}  → metadata.requestId value in JSON
```

## Step 4: Conditions (Optional)

You may want the button to appear only in certain cases:

| Field | Operator | Value |
|-------|----------|-------|
| `userId` | `exists` | — |

In this case, the button only appears on rows where the `userId` field is non-empty.

More condition examples:

```
level equals "ERROR"           → Only on error logs
source contains "api-gateway"  → On API gateway logs
env notEquals "production"     → On non-production environments
```

## Step 5: Save and Test

1. Click **"Save"**
2. Refresh the Graylog page
3. You should see the **"View User"** button on log rows containing `userId`!

## Result

```
Log row: { userId: "12345", message: "Login failed", ... }
              ↓
Graytool injects button: [View User]
              ↓
On click, opens: https://admin.company.com/users/12345
```

## Next Steps

- [Learn conditions in detail →](/configuration/conditions)
- [Field bindings details →](/configuration/field-bindings)
- [Work with multiple URL patterns →](/configuration/url-patterns)
