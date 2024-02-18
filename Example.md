# Welcome

This is a **live demo** of MDXEditor with all default features on.

> The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible.
> The idea is that a Markdown-formatted document should be publishable as-is, as plain text,
> without looking like it’s been marked up with tags or formatting instructions.

:::tip
We can use this easily on the server
:::

- [x] Test
- [ ] Another test

::youtube[Video of a cat in a box]{#4WmCw8_KbC4}

[— Daring Fireball](https://daringfireball.net/projects/markdown/).

---

In here, you can find the following markdown elements:

1. Headings
2. Lists
   - Unordered
   - Ordered
   - Check lists
   - And nested ;)
3. Links
4. Bold/Italic/Underline formatting
5. Tables
6. Code block editors
7. And much more.

The current editor content is styled using the `@tailwindcss/typography` [plugin](https://tailwindcss.com/docs/typography-plugin).

## What can you do here?

<img
  height="392"
  width="800"
  alt="Test"
  title="test"
  src="/media/aboutUsImage.png"
/>

This is a great location for you to test how editing markdown feels. If you have an existing markdown source, you can switch to source mode using the toggle group in the top right, paste it in there, and go back to rich text mode.

If you need a few ideas, here's what you can try:

1. Add your own code sample
2. Change the type of the headings
3. Insert a table, add a few rows and columns
4. Switch back to source markdown to see what you're going to get as an output
5. Test the diff feature to see how the markdown has changed
6. Add a frontmatter block through the toolbar button

## A code sample

MDXEditor embeds CodeMirror for code editing.

```tsx
export default function App() {
  return <div>Hello world</div>;
}
```

## A live code example

The block below is a live React component. You can configure multiple live code presets that specify the available npm packages and the default imports. You can also specify a default component that will be rendered in the live code block.

```jsx live
export default function App() {
  return (
    <div>
      <p>
        This is a live React component, that's being previewed in
        codesandbox.{" "}
      </p>
      <p>Editing it will update the fenced codeblock in the markdown.</p>
    </div>
  );
}
```

## A table

Play with the table below - add rows, columns, change column alignment. When editing,
you can navigate the cells with `enter`, `shift+enter`, `tab` and `shift+tab`.

| Item              | In Stock | Price |
| :---------------- | :------: | ----: |
| Python Hat        |   True   | 23.99 |
| SQL Hat           |   True   | 23.99 |
| Codecademy Tee    |  False   | 19.99 |
| Codecademy Hoodie |  False   | 42.99 |
