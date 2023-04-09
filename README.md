# FormKit Plugin for Hybridly

FormKit plugin for automatically mapping Hybridly errors to form fields.

-   ⚙️ Zero-configuration.
-   🪆 Works with deeply nested forms, groups and lists.

## Installation

The FormKit plugin for Hybridly is available as an NPM package.

Run one of the following commands to add the package to your project.

```bash
# npm
npm install @hedger/formkit-plugin-hybridly

# yarn
yarn add @hedger/formkit-plugin-hybridly

# pnpm
pnpm add @hedger/formkit-plugin-hybridly
```

### Registering the plugin

When registered, the plugin will attach itself to all root FormKit nodes that
have a type of `form`.

```ts
import Hybridly from '@hedger/formkit-plugin-hybridly';

export default {
    plugins: [Hybridly],
};
```

## Multiple forms on the same page

When multiple forms are present on the same page, you must specify the name of
the error bag to use to ensure that the correct errors are mapped to the correct
form. Set the form's `errorBag` prop to the same name as the `errorBag` option
on the `useForm` call.

```html
<script setup>
    const loginForm = useForm({
        method: 'POST',
        url: '/login',
        errorBag: 'login',
        fields: {
            email: '',
            password: '',
        },
    });
</script>

<template>
    <FormKit
        type="form"
        errorBag="login"
        v-model="loginForm.fields"
        @submit="loginForm.submit">
        <FormKitField type="email" name="email" />
        <FormKitField type="password" name="password" />
    </FormKit>
</template>
```

## How it works

This plugins hooks into Hybridly's `navigated` event and extracts the errors
from the response. It then maps the errors to the form fields by matching the
field name to the error key.

For example, if you have a form with a field named `email` and the response
contains an error with the key `email`, the error will be mapped to the `email`
field.

## License

This plugin is open-sourced software licensed under the
[MIT license](LICENSE.md).
