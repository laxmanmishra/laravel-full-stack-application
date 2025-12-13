import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { FormEvent } from 'react';

interface Feature {
    id: number;
    name: string;
    description: string;
    user_id?: number;
    user?: any;
    created_at?: string;
    upvote_count?: number;
    user_has_upvoted?: boolean;
    user_has_downvoted?: boolean;
}

interface EditFeatureProps {
    feature: {
        data: Feature;
    };
}

export default function EditFeature({ feature }: EditFeatureProps) {
    // Debug: log what's being received
    console.log('EditFeature props:', { feature });

    // Unwrap the data property
    const featureData = feature?.data;

    // Guard against undefined feature
    if (!featureData) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Edit Feature" />
                <div className="text-center py-8">
                    <p className="text-red-600">Error: Feature not found</p>
                    <p className="text-sm text-gray-500 mt-2">Check console for props details</p>
                </div>
            </AppLayout>
        );
    }

    const featureId = featureData.id;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Features',
            href: '/features',
        },
        {
            title: featureData.name,
            href: `/features/${featureId}`,
        },
        {
            title: 'Edit',
            href: `/features/${featureId}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: featureData.name,
        description: featureData.description,
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/features/${featureId}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Feature" />
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/features" prefetch>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit Feature
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
                                {processing ? 'Updating...' : 'Update'}
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
