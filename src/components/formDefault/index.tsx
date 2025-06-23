'use client';

import { useEffect, useTransition } from 'react';
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { DebouncedState, useDebouncedCallback } from 'use-debounce';

import ButtonDefault from '@/components/buttonDefault';
import InputDefault from '@/components/inputDefault';
import { useNotification } from '@/components/notifications/provider';
import SelectFilter from '../selectDefault';

export type Field<T extends FieldValues = FieldValues> =
  | {
      name: keyof T & string;
      label: string;
      type: 'text' | 'password' | 'number';
      validation?: RegisterOptions;
      className?: string;
    }
  | {
      name: keyof T & string;
      label: string;
      type: 'select';
      options: { label: string; value: string }[];
      validation?: RegisterOptions;
      className?: string;
    };

export type FormProps<T extends FieldValues = FieldValues> = {
  fields: Field<T>[];
  onSubmit: DebouncedState<(data: T) => void>;
  submitText?: string;
  className?: string;
};

export default function FormDefault<T extends FieldValues>({
  fields,
  onSubmit,
  className,
  submitText = 'Salvar',
}: FormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<T>();

  const [isPending, startTransition] = useTransition();
  const { notify } = useNotification();

  const handleFormSubmit = useDebouncedCallback((data: T) => {
    startTransition(async () => {
      onSubmit(data);
    });
  }, 300);

  useEffect(() => {
    const errs: string[] = [];
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        errs.push(error.message as string);
      }
    });
    isSubmitted && errs.length > 0 && notify(errs.join('\n'), 'error');
  }, [errors, isSubmitted]);

  const validationToRules = (validation?: RegisterOptions) => {
    if (!validation) {
      return undefined;
    }
    const keys = Object.keys(validation) as (keyof typeof validation)[];
    let rules = {};

    keys.forEach((key) => {
      rules = { ...rules, [key]: validation[key] };
    });
    return rules;
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`space-y-4 shadow-sm p-5 flex flex-col ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-5 w-full">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`flex flex-col  gap-1 w-full ${
              field.className ?? ''
            }`}
          >
            <label>{field.label}</label>

            <Controller
              name={field.name as Path<T>}
              control={control}
              rules={validationToRules(field.validation)}
              render={({ field: controllerField, fieldState }) => {
                const commonProps = {
                  error: !!fieldState.error,
                  ...controllerField,
                };

                if (field.type === 'select') {
                  return (
                    <SelectFilter
                      options={field.options}
                      value={controllerField.value ?? ''}
                      onChange={controllerField.onChange}
                      error={!!fieldState.error}
                      />
                    );
                  } else {
                    return (
                      <InputDefault
                      value={controllerField.value ?? ''}
                      id={field.name}
                      type={field.type}
                      min={field.type === 'number' ? 0 : undefined}
                      onChange={controllerField.onChange}
                    />
                  );
                }
              }}
            />

            {errors[field.name] && (
              <span className="text-red-500">
                {(errors[field.name]?.message as string) || ''}
              </span>
            )}
          </div>
        ))}
      </div>

      <ButtonDefault type="submit" disabled={isPending}>
        {isPending ? 'Processando...' : submitText}
      </ButtonDefault>
    </form>
  );
}
