import { Component, Host, h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';


describe('hydrate, shadow in shadow', () => {

  it('nested cmp-b w/ shadow/slot, root level text', async () => {
    @Component({ tag: 'cmp-a', shadow: true })
    class CmpA {
      render() {
        return (
          <Host>
            <cmp-b>
              <slot></slot>
            </cmp-b>
          </Host>
        );
      }
    }
    @Component({ tag: 'cmp-b', shadow: true })
    class CmpB {
      render() {
        return (
          <Host>
            <slot></slot>
          </Host>
        );
      }
    }
    // @ts-ignore
    const serverHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: `<cmp-a>light-dom</cmp-a>`,
      hydrateServerSide: true
    });
    expect(serverHydrated.root).toEqualHtml(`
      <cmp-a s-id="1">
        <!--r.1-->
        <!--o.0.1-->
        <cmp-b c-id="1.0.0.0" s-id="2">
          <!--r.2-->
          <!--o.1.1-->
          <!--s.2.0.0.0.-->
          <!--s.1.1.1.0.-->
          <!--t.0.1-->
          light-dom
        </cmp-b>
      </cmp-a>
    `);

    // @ts-ignore
    const clientHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: serverHydrated.root.outerHTML,
      hydrateClientSide: true,
      serializedShadowDom: true
    });

    expect(clientHydrated.root).toEqualHtml(`
      <cmp-a>
        <shadow-root>
          <cmp-b>
            <shadow-root>
              <slot></slot>
            </shadow-root>
            <!---->
            <slot></slot>
          </cmp-b>
        </shadow-root>
        <!---->
        light-dom
      </cmp-a>
    `);
  });

  it('nested cmp-b w/ shadow, text slot', async () => {
    @Component({ tag: 'cmp-a', shadow: true })
    class CmpA {
      render() {
        return (
          <Host>
            <cmp-b>light-dom</cmp-b>
          </Host>
        );
      }
    }
    @Component({ tag: 'cmp-b', shadow: true })
    class CmpB {
      render() {
        return (
          <Host>
            <slot></slot>
          </Host>
        );
      }
    }
    // @ts-ignore
    const serverHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: `<cmp-a></cmp-a>`,
      hydrateServerSide: true
    });
    expect(serverHydrated.root).toEqualHtml(`
      <cmp-a s-id="1">
        <!--r.1-->
        <cmp-b c-id="1.0.0.0" s-id="2">
          <!--r.2-->
          <!--o.1.1-->
          <!--s.2.0.0.0.-->
          <!--t.1.1.1.0-->
          light-dom
        </cmp-b>
      </cmp-a>
    `);

    // @ts-ignore
    const clientHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: serverHydrated.root.outerHTML,
      hydrateClientSide: true,
      serializedShadowDom: true
    });

    expect(clientHydrated.root).toEqualHtml(`
      <cmp-a>
        <shadow-root>
          <cmp-b>
            <shadow-root>
              <slot></slot>
            </shadow-root>
            <!---->
            light-dom
          </cmp-b>
        </shadow-root>
      </cmp-a>
    `);
  });

  it('nested cmp-b w/ shadow, shadow element header', async () => {
    @Component({ tag: 'cmp-a' })
    class CmpA {
      render() {
        return (
          <Host>
            <cmp-b></cmp-b>
          </Host>
        );
      }
    }
    @Component({ tag: 'cmp-b', shadow: true })
    class CmpB {
      render() {
        return (
          <Host>
            <header></header>
            <slot></slot>
          </Host>
        );
      }
    }
    // @ts-ignore
    const serverHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: `<cmp-a></cmp-a>`,
      hydrateServerSide: true
    });
    expect(serverHydrated.root).toEqualHtml(`
      <cmp-a s-id="1">
        <!--r.1-->
        <cmp-b c-id="1.0.0.0" s-id="2">
          <!--r.2-->
          <header c-id="2.0.0.0"></header>
          <!--s.2.1.0.1.-->
        </cmp-b>
      </cmp-a>
    `);

    // @ts-ignore
    const clientHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: serverHydrated.root.outerHTML,
      hydrateClientSide: true,
      serializedShadowDom: true
    });

    expect(clientHydrated.root).toEqualHtml(`
      <cmp-a>
        <!--r.1-->
        <cmp-b>
          <shadow-root>
            <header></header>
            <slot></slot>
          </shadow-root>
        </cmp-b>
      </cmp-a>
    `);
  });

  it('nested cmp-b w/ shadow, shadow text header', async () => {
    @Component({ tag: 'cmp-a' })
    class CmpA {
      render() {
        return (
          <Host>
            <cmp-b></cmp-b>
          </Host>
        );
      }
    }
    @Component({ tag: 'cmp-b', shadow: true })
    class CmpB {
      render() {
        return (
          <Host>
            shadow-header
            <slot></slot>
          </Host>
        );
      }
    }
    // @ts-ignore
    const serverHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: `<cmp-a></cmp-a>`,
      hydrateServerSide: true
    });
    expect(serverHydrated.root).toEqualHtml(`
      <cmp-a s-id="1">
        <!--r.1-->
        <cmp-b c-id="1.0.0.0" s-id="2">
          <!--r.2-->
          <!--t.2.0.0.0-->
          shadow-header
          <!--s.2.1.0.1.-->
        </cmp-b>
      </cmp-a>
    `);

    // @ts-ignore
    const clientHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: serverHydrated.root.outerHTML,
      hydrateClientSide: true,
      serializedShadowDom: true
    });

    expect(clientHydrated.root).toEqualHtml(`
      <cmp-a>
        <!--r.1-->
        <cmp-b>
          <shadow-root>
            shadow-header
            <slot></slot>
          </shadow-root>
        </cmp-b>
      </cmp-a>
    `);
  });

  it('nested shadow, text slot, header', async () => {
    @Component({ tag: 'cmp-a' })
    class CmpA {
      render() {
        return (
          <Host>
            <cmp-b>light-dom</cmp-b>
          </Host>
        );
      }
    }
    @Component({ tag: 'cmp-b', shadow: true })
    class CmpB {
      render() {
        return (
          <Host>
            <header></header>
            <slot></slot>
          </Host>
        );
      }
    }
    // @ts-ignore
    const serverHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: `<cmp-a></cmp-a>`,
      hydrateServerSide: true
    });
    expect(serverHydrated.root).toEqualHtml(`
      <cmp-a s-id="1">
        <!--r.1-->
        <cmp-b c-id="1.0.0.0" s-id="2">
          <!--r.2-->
          <!--o.1.1-->
          <header c-id="2.0.0.0"></header>
          <!--s.2.1.0.1.-->
          <!--t.1.1.1.0-->
          light-dom
        </cmp-b>
      </cmp-a>
    `);

    // @ts-ignore
    const clientHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: serverHydrated.root.outerHTML,
      hydrateClientSide: true
    });

    expect(clientHydrated.root).toEqualHtml(`
      <cmp-a>
        <!--r.1-->
        <cmp-b>
          <shadow-root>
            <header></header>
            <slot></slot>
          </shadow-root>
          <!---->
          light-dom
        </cmp-b>
      </cmp-a>
    `);
  });

  it('nested cmp-b w/ shadow, shadow header text, shadow footer elm w/ text', async () => {
    @Component({ tag: 'cmp-a' })
    class CmpA {
      render() {
        return (
          <Host>
            <cmp-b></cmp-b>
          </Host>
        );
      }
    }
    @Component({ tag: 'cmp-b', shadow: true })
    class CmpB {
      render() {
        return (
          <Host>
            shadow-header
            <footer>shadow-footer</footer>
          </Host>
        );
      }
    }
    // @ts-ignore
    const serverHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: `<cmp-a></cmp-a>`,
      hydrateServerSide: true
    });
    expect(serverHydrated.root).toEqualHtml(`
      <cmp-a s-id="1">
        <!--r.1-->
        <cmp-b c-id="1.0.0.0" s-id="2">
          <!--r.2-->
          <!--t.2.0.0.0-->
          shadow-header
          <footer c-id="2.1.0.1">
            <!--t.2.2.1.0-->
            shadow-footer
          </footer>
        </cmp-b>
      </cmp-a>
    `);

    // @ts-ignore
    const clientHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: serverHydrated.root.outerHTML,
      hydrateClientSide: true,
      serializedShadowDom: true
    });

    expect(clientHydrated.root).toEqualHtml(`
      <cmp-a>
        <!--r.1-->
        <cmp-b>
          <shadow-root>
            shadow-header
            <footer>
              shadow-footer
            </footer>
          </shadow-root>
        </cmp-b>
      </cmp-a>
    `);
  });

  it('nested, text slot, header/footer', async () => {
    @Component({ tag: 'cmp-a' })
    class CmpA {
      render() {
        return (
          <Host>
            <cmp-b>light-dom</cmp-b>
          </Host>
        );
      }
    }
    @Component({ tag: 'cmp-b', shadow: true })
    class CmpB {
      render() {
        return (
          <Host>
            <header></header>
            <slot></slot>
            <footer></footer>
          </Host>
        );
      }
    }
    // @ts-ignore
    const serverHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: `<cmp-a></cmp-a>`,
      hydrateServerSide: true
    });
    expect(serverHydrated.root).toEqualHtml(`
      <cmp-a s-id="1">
        <!--r.1-->
        <cmp-b c-id="1.0.0.0" s-id="2">
          <!--r.2-->
          <!--o.1.1-->
          <header c-id="2.0.0.0"></header>
          <!--s.2.1.0.1.-->
          <!--t.1.1.1.0-->
          light-dom
          <footer c-id="2.2.0.2"></footer>
        </cmp-b>
      </cmp-a>
    `);

    // @ts-ignore
    const clientHydrated = await newSpecPage({
      components: [CmpA, CmpB],
      html: serverHydrated.root.outerHTML,
      hydrateClientSide: true
    });

    expect(clientHydrated.root).toEqualHtml(`
      <cmp-a>
        <!--r.1-->
        <cmp-b>
          <shadow-root>
            <header></header>
            <slot></slot>
            <footer></footer>
          </shadow-root>
          <!---->
          light-dom
        </cmp-b>
      </cmp-a>
    `);
  });

});
