import { redirect } from '@remix-run/node';
import { useLoaderData } from 'remix';
import { getSession, commitSession } from '../session';

export async function action({ request }: { request: Request }) {
  const session = await getSession(request.headers.get('Cookie'));

  const form = await request.formData();

  const id = form.get('productId') as string;

  const products = session.get('products') as string[] | undefined;

  session.set('products', [...(products || []), id]);

  return redirect('http://localhost:8080/index', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

type Products = Record<string, number>;

export async function loader({
  request,
}: {
  request: Request;
}): Promise<Products> {
  const session = await getSession(request.headers.get('Cookie'));

  const allProducts = session.get('products') || [];

  // ["0", "1", "2", "1"] -> { "0": 1, "1": 2, "2": 1}
  const products = allProducts.reduce(
    (products: Products, product: string) => ({
      ...products,
      [product]: 1 + (products[product] || 0),
    }),
    {}
  );

  return products;
}

export default function Index() {
  const products = useLoaderData<Products>();

  return (
    <section style={{ border: '5px solid #44AF69', padding: '20px' }}>
      <h2>Cart</h2>
      <ul>
        {Object.entries(products).map(([id, quantity]) => (
          <li key={id}>
            {id} x {quantity}
          </li>
        ))}
      </ul>
    </section>
  );
}
