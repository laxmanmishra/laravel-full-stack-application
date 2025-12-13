import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

interface Feature {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    upvote_count: number;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: {
        name: string;
    };
}

interface ShowFeatureProps {
    feature: Feature;
    comments?: Comment[];
}

export default function ShowFeature({ feature, comments = [] }: ShowFeatureProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Features',
            href: '/features',
        },
        {
            title: feature.name,
            href: `/features/${feature.id}`,
        },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this feature?')) {
            router.delete(`/features/${feature.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={feature.name} />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/features" prefetch>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {feature.name}
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {feature.upvote_count} upvotes • Created{' '}
                                {new Date(feature.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/features/${feature.id}/edit`} prefetch>
                            <Button>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Description
                                </h2>
                                <p className="mt-2 text-muted-foreground whitespace-pre-wrap">
                                    {feature.description}
                                </p>
                            </div>
                        </div>

                        {comments.length > 0 && (
                            <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                                <h2 className="text-lg font-semibold mb-4">
                                    Comments
                                </h2>
                                <div className="space-y-4">
                                    {comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="border-b border-sidebar-border/70 pb-4 last:border-b-0 dark:border-sidebar-border"
                                        >
                                            <p className="font-medium">
                                                {comment.user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(
                                                    comment.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                            <p className="mt-2">
                                                {comment.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Created
                                    </p>
                                    <p className="text-muted-foreground">
                                        {new Date(
                                            feature.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="border-t border-sidebar-border/70 pt-4 dark:border-sidebar-border">
                                    <p className="text-sm font-medium">
                                        Last Updated
                                    </p>
                                    <p className="text-muted-foreground">
                                        {new Date(
                                            feature.updated_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="border-t border-sidebar-border/70 pt-4 dark:border-sidebar-border">
                                    <p className="text-sm font-medium">
                                        Upvotes
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {feature.upvote_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
