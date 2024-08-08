'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 处理类型验证，您有几种选择。虽然您可以手动验证类型，但使用类型验证库可以节省您的时间和精力。
// 我们将使用Zod ，一个 TypeScript 优先的验证库，可以为您简化此任务。
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
// 服务端验证
// prevState - 包含从useActionState挂钩传递的状态。您不会在本例的操作中使用它，但它是必需的道具。
export async function createInvoice(prevState: State, formData: FormData) {
  // export async function createInvoice(formData: FormData) {
  // 提示：如果您正在使用具有许多字段的表单，您可能需要考虑使用entries()使用 JavaScript 的Object.fromEntries()方法。例如：
  // const rawFormData = Object.fromEntries(formData.entries())
  // const { customerId, amount, status } = CreateInvoice.parse({

  // 服务端验证
  // safeParse()将返回一个包含success或error字段的对象。这将有助于更优雅地处理验证，而无需将此逻辑放入try/catch块中。
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // 数据库更新后， /dashboard/invoices路径将重新验证，并从服务器获取新数据。
  revalidatePath('/dashboard/invoices');
  // 此时，您还希望将用户重定向回/dashboard/invoices页面。您可以使用 Next.js 中的redirect功能来执行此操作：
  redirect('/dashboard/invoices');
  // 请注意如何在try/catch块之外调用redirect 。
  // 这是因为redirect是通过抛出错误来工作的，该错误会被catch块捕获。
  // 为了避免这种情况，可以在try/catch之后调用redirect 。仅当try成功时才能访问redirect 。
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}