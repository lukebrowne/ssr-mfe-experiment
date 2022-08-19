import { redirect } from '@remix-run/node';
import { useLoaderData } from 'remix';
import { getSession, commitSession } from '../session';

export async function action({ request }: { request: Request }) {
  const session = await getSession(request.headers.get('Cookie'));

  const form = await request.formData();

  const name = form.get('name') as string;
  const price = parseFloat(form.get('price') as string).toFixed(2);

  const products = session.get('products') as string[] | undefined;

  session.set('products', [...(products || []), { name, price }]);

  return redirect('http://localhost:8080/index', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

type Products = { name: string; price: number }[];

export async function loader({
  request,
}: {
  request: Request;
}): Promise<Products> {
  const session = await getSession(request.headers.get('Cookie'));

  const rawProducts = session.get('products') || [];
  return rawProducts.map(({ price, ...rest }: Record<string, string>) => ({
    price: parseFloat(price),
    ...rest,
  }));
}

export default function Index() {
  const products = useLoaderData<Products>();

  const total = products.reduce((total, { price }) => total + price, 0);

  return (
    <section style={{ border: '5px solid #44AF69', padding: '20px' }}>
      <h2>Cart</h2>
      <ul>
        {products.map(({ name, price }, index) => (
          <li key={index}>
            {name} @ {price} GBP
          </li>
        ))}
      </ul>
      <p className="blink">Total: {total.toFixed(2)} GBP</p>
    </section>
  );
}
