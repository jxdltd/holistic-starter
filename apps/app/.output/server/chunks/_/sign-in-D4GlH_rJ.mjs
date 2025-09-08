import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { a as auth, B as Button, c as cn } from './button-Coqm6M7W.mjs';
import { useMemo, useState, useEffect, createContext, useContext } from 'react';
import { FieldGroupApi, FormApi, functionalUpdate, FieldApi } from '@tanstack/form-core';
import { useStore } from '@tanstack/react-store';
import { I as Input } from './input-Cb3wVy8b.mjs';
import * as LabelPrimitive from '@radix-ui/react-label';
import z from 'zod';
import 'better-auth/react';
import 'better-auth/client/plugins';
import '@polar-sh/better-auth';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

const useIsomorphicLayoutEffect = useEffect;
function useField(opts) {
  const [fieldApi] = useState(() => {
    const api = new FieldApi({
      ...opts,
      form: opts.form,
      name: opts.name
    });
    const extendedApi = api;
    extendedApi.Field = Field;
    return extendedApi;
  });
  useIsomorphicLayoutEffect(fieldApi.mount, [fieldApi]);
  useIsomorphicLayoutEffect(() => {
    fieldApi.update(opts);
  });
  useStore(
    fieldApi.store,
    opts.mode === "array" ? (state) => {
      var _a;
      return [
        state.meta,
        Object.keys((_a = state.value) != null ? _a : []).length
      ];
    } : void 0
  );
  return fieldApi;
}
const Field = (({
  children,
  ...fieldOptions
}) => {
  const fieldApi = useField(fieldOptions);
  const jsxToDisplay = useMemo(
    () => functionalUpdate(children, fieldApi),
    /**
     * The reason this exists is to fix an issue with the React Compiler.
     * Namely, functionalUpdate is memoized where it checks for `fieldApi`, which is a static type.
     * This means that when `state.value` changes, it does not trigger a re-render. The useMemo explicitly fixes this problem
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, fieldApi, fieldApi.state.value, fieldApi.state.meta]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: jsxToDisplay });
});
function LocalSubscribe$1({
  form,
  selector,
  children
}) {
  const data = useStore(form.store, selector);
  return functionalUpdate(children, data);
}
function useForm(opts) {
  const [formApi] = useState(() => {
    const api = new FormApi(opts);
    const extendedApi = api;
    extendedApi.Field = function APIField(props) {
      return /* @__PURE__ */ jsx(Field, { ...props, form: api });
    };
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ jsx(
        LocalSubscribe$1,
        {
          form: api,
          selector: props.selector,
          children: props.children
        }
      );
    };
    return extendedApi;
  });
  useIsomorphicLayoutEffect(formApi.mount, []);
  useIsomorphicLayoutEffect(() => {
    formApi.update(opts);
  });
  return formApi;
}
function LocalSubscribe({
  lens,
  selector,
  children
}) {
  const data = useStore(lens.store, selector);
  return functionalUpdate(children, data);
}
function useFieldGroup(opts) {
  const [formLensApi] = useState(() => {
    const api = new FieldGroupApi(opts);
    const form = opts.form instanceof FieldGroupApi ? opts.form.form : opts.form;
    const extendedApi = api;
    extendedApi.AppForm = function AppForm(appFormProps) {
      return /* @__PURE__ */ jsx(form.AppForm, { ...appFormProps });
    };
    extendedApi.AppField = function AppField({ name, ...appFieldProps }) {
      return /* @__PURE__ */ jsx(
        form.AppField,
        {
          name: formLensApi.getFormFieldName(name),
          ...appFieldProps
        }
      );
    };
    extendedApi.Field = function Field2({ name, ...fieldProps }) {
      return /* @__PURE__ */ jsx(
        form.Field,
        {
          name: formLensApi.getFormFieldName(name),
          ...fieldProps
        }
      );
    };
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ jsx(
        LocalSubscribe,
        {
          lens: formLensApi,
          selector: props.selector,
          children: props.children
        }
      );
    };
    return Object.assign(extendedApi, {
      ...opts.formComponents
    });
  });
  useIsomorphicLayoutEffect(formLensApi.mount, [formLensApi]);
  return formLensApi;
}
const fieldContext$1 = createContext(null);
const formContext$1 = createContext(null);
function createFormHookContexts() {
  function useFieldContext2() {
    const field = useContext(fieldContext$1);
    if (!field) {
      throw new Error(
        "`fieldContext` only works when within a `fieldComponent` passed to `createFormHook`"
      );
    }
    return field;
  }
  function useFormContext2() {
    const form = useContext(formContext$1);
    if (!form) {
      throw new Error(
        "`formContext` only works when within a `formComponent` passed to `createFormHook`"
      );
    }
    return form;
  }
  return { fieldContext: fieldContext$1, useFieldContext: useFieldContext2, useFormContext: useFormContext2, formContext: formContext$1 };
}
function createFormHook({
  fieldComponents,
  fieldContext: fieldContext2,
  formContext: formContext2,
  formComponents
}) {
  function useAppForm2(props) {
    const form = useForm(props);
    const AppForm = useMemo(() => {
      const AppForm2 = (({ children }) => {
        return /* @__PURE__ */ jsx(formContext2.Provider, { value: form, children });
      });
      return AppForm2;
    }, [form]);
    const AppField = useMemo(() => {
      const AppField2 = (({ children, ...props2 }) => {
        return /* @__PURE__ */ jsx(form.Field, { ...props2, children: (field) => (
          // eslint-disable-next-line @eslint-react/no-context-provider
          /* @__PURE__ */ jsx(fieldContext2.Provider, { value: field, children: children(Object.assign(field, fieldComponents)) })
        ) });
      });
      return AppField2;
    }, [form]);
    const extendedForm = useMemo(() => {
      return Object.assign(form, {
        AppField,
        AppForm,
        ...formComponents
      });
    }, [form, AppField, AppForm]);
    return extendedForm;
  }
  function withForm({
    render,
    props
  }) {
    return (innerProps) => render({ ...props, ...innerProps });
  }
  function withFieldGroup({
    render,
    props,
    defaultValues
  }) {
    return function Render(innerProps) {
      const fieldGroupProps = useMemo(() => {
        return {
          form: innerProps.form,
          fields: innerProps.fields,
          defaultValues,
          formComponents
        };
      }, [innerProps.form, innerProps.fields]);
      const fieldGroupApi = useFieldGroup(fieldGroupProps);
      return render({ ...props, ...innerProps, group: fieldGroupApi });
    };
  }
  return {
    useAppForm: useAppForm2,
    withForm,
    withFieldGroup
  };
}
const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function TextField({ label }) {
  const field = useFieldContext();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full", children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: field.name, className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsx(
      Input,
      {
        id: field.name,
        value: field.state.value,
        onChange: (e) => field.handleChange(e.target.value)
      }
    ),
    field.state.meta.errors && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: field.state.meta.errors.map((error) => error.message).join(", ") })
  ] });
}
function SubmitButton({ children }) {
  const form = useFormContext();
  return /* @__PURE__ */ jsx(form.Subscribe, { selector: (state) => state.isSubmitting, children: (isSubmitting) => /* @__PURE__ */ jsx(Button, { className: "w-full", type: "submit", disabled: isSubmitting, children }) });
}
const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField
    // NumberField,
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext
});
function Logo() {
  return /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "Logo" });
}
const formSchema = z.object({
  email: z.email()
});
function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      email: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: ({
      value
    }) => {
      auth.signIn.magicLink({
        email: value.email
      });
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen bg-accent gap-5", children: [
    /* @__PURE__ */ jsx(Logo, {}),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col items-center justify-center gap-4 bg-card p-4 rounded-md w-full max-w-md border shadow-xs", onSubmit: (e) => {
      e.preventDefault();
      form.handleSubmit();
    }, children: [
      /* @__PURE__ */ jsx(form.AppField, { name: "email", children: (field) => /* @__PURE__ */ jsx(field.TextField, { label: "Email" }) }),
      /* @__PURE__ */ jsx(form.AppForm, { children: /* @__PURE__ */ jsx(form.SubmitButton, { children: "Sign In" }) })
    ] })
  ] });
}

export { RouteComponent as component };
//# sourceMappingURL=sign-in-D4GlH_rJ.mjs.map
