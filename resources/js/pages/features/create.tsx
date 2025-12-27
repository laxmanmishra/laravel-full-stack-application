import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: '/features',
    },
    {
        title: 'Create',
        href: '/features/create',
    },
];

export default function CreateFeature() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/features');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Feature" />
            <div className="space-y-6 px-3 mt-3">
                <div className="flex items-center gap-4">
                    <Link href="/features" prefetch>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create Feature
                    </h1>
                </div>

                <div className="max-w-2xl rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">
                                Name
                            </label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Feature name"
                                className="bg-background"
                                disabled={processing}
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">
                                Description
                            </label>
                            <Textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Feature description"
                                className="min-h-[200px] bg-background"
                                disabled={processing}
                            />
                            {errors.description && (
                                <p className="text-xs text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="min-w-[120px]"
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </Button>
                            <Link href="/features" prefetch>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
