import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: '/features',
    },
];

interface Feature {
    id: number;
    name: string;
    description: string;
    user_id: number;
    created_at: string;
    upvote_count: number;
}

interface FeaturesIndexProps {
    features: {
        data: Feature[];
        links: Record<string, string>;
    };
}

export default function FeaturesIndex({ features }: FeaturesIndexProps) {
    const { url } = usePage();
    const pageProps = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Features" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Features
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage your application features
                        </p>
                    </div>
                    <Link href={'/features/create'} prefetch>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Feature
                        </Button>
                    </Link>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-sidebar-border/70 bg-sidebar dark:border-sidebar-border">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left font-semibold">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left font-semibold">
                                        Upvotes
                                    </th>
                                    <th className="px-6 py-3 text-left font-semibold">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.data.length > 0 ? (
                                    features.data.map((feature) => (
                                        <tr
                                            key={feature.id}
                                            className="border-b border-sidebar-border/70 hover:bg-sidebar/50 dark:border-sidebar-border"
                                        >
                                            <td className="px-6 py-4 font-medium">
                                                {feature.name}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {feature.description?.substring(
                                                    0,
                                                    50
                                                )}
                                                ...
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {feature.upvote_count || 0}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {new Date(
                                                    feature.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/features/${feature.id}`}
                                                        prefetch
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={`/features/${feature.id}/edit`}
                                                        prefetch
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-muted-foreground"
                                        >
                                            No features yet. Create your first
                                            feature!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
