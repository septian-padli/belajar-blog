"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import RichEditor from "@/components/ckeditor/ckeditor"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import { convertIframeToOembed, convertOembedToIframe, debounce } from "@/lib/utils"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Category } from "@prisma/client"
import FormCategory from "./FormCategory"

const formSchema = z.object({
    title: z.string().min(2).max(50),
    category: z.string().min(2),
    content: z.string().min(2)
});

const FormPost = () => {
    const [loading, setLoading] = useState(false)
    const [submittedTitle, setSubmittedTitle] = useState('');
    const [submittedContent, setSubmittedContent] = useState('');
    const [openCategory, setOpenCategory] = useState(false)
    const [valueCategory, setValueCategory] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const [categories, setCategories] = useState<Category[]>([])
    const [inputSearch, setInputSearch] = useState("");

    const defaultContent = convertIframeToOembed(`
<h2>📌 Informasi Penting</h2>
<p>Ini adalah <strong>konten demo</strong> yang memanfaatkan fitur-fitur utama dari editor CKEditor:</p>
<ul>
  <li><strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, <s>Strikethrough</s></li>
  <li><sub>Subscript</sub> dan <sup>Superscript</sup>, serta <code>Inline code</code></li>
  <li><a href="https://example.com" target="_blank">Link ke situs eksternal</a></li>
  <li>Special Character: © ™ ∞ ☕ ★</li>
</ul>
<hr>
<h3>📋 List & Alignment</h3>
<p style="text-align: left;">Ini teks rata kiri</p>
<p style="text-align: center;">Ini teks rata tengah</p>
<p style="text-align: right;">Ini teks rata kanan</p>
<ol>
  <li>Langkah pertama</li>
  <li>Langkah kedua</li>
</ol>
<blockquote>"Kutipan penting yang ingin disorot."</blockquote>
<pre><code class="language-js">function helloWorld() {
    console.log("Hello, world!");
}</code></pre>
<h3>📺 Media & Tabel</h3>
<figure class="media"><iframe class="mx-auto mt-2 w-3/4 aspect-video" src="https://www.youtube.com/embed/Y78JLjlXP7g?si=ZMLaNEBeZ6MPmoOg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe></figure>
<p>Contoh tabel:</p>
<table>
  <thead>
    <tr><th>Nama</th><th>Umur</th><th>Kota</th></tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>23</td><td>Bandung</td></tr>
    <tr><td>Budi</td><td>30</td><td>Surabaya</td></tr>
  </tbody>
</table>
`);

    useEffect(() => {
        setLoading(true)
        const fetchInitialCategories = async () => {
            setLoading(true)
            const res = await fetch("/api/category/get?limit=5");
            const data = await res.json();
            setCategories(data);
        };
        fetchInitialCategories();
        setLoading(false)
    }, []);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setInputSearch(query);
        try {
            const res = await fetch(`/api/category/get?name=${encodeURIComponent(query)}`);
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error("Search failed:", error);
            setCategories([]); // Optional, kosongkan kategori saat error
        }

        setLoading(false);
    };


    const debouncedSearch = React.useMemo(() => debounce(handleSearch, 500), []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: 'lorem ipsum dolor sit amet',
            category: "",
            content: defaultContent, // ⬅️ set default value di sini
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmittedTitle(values.title);
        const transformedContent = convertOembedToIframe(values.content); // hanya ubah <oembed>, lainnya tetap
        setSubmittedContent(transformedContent);

        console.log("konten: ", values.content)
    }

    return (
        <>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create category</DialogTitle>
                        <DialogDescription>
                            Buat kategori baru disini
                        </DialogDescription>
                    </DialogHeader>
                    <FormCategory />
                </DialogContent>
            </Dialog>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Popover open={openCategory} onOpenChange={setOpenCategory}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openCategory}
                                                        className="justify-between"
                                                    >
                                                        {valueCategory
                                                            ? categories.find((category) => category.id === valueCategory)?.name
                                                            : "Select category..."}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[480px] p-0">
                                                    <Command key={JSON.stringify(categories)}>
                                                        <CommandInput autoFocus placeholder={(inputSearch == '') ? "Search category..." : inputSearch} className="h-9"
                                                            onValueChange={(query) => {
                                                                debouncedSearch(query);
                                                            }} />
                                                        <CommandList>
                                                            {loading ? (
                                                                <CommandGroup>
                                                                    <CommandItem>Loading...</CommandItem>
                                                                </CommandGroup>
                                                            ) : categories.length === 0 ? (
                                                                <>
                                                                    {/* Tampilkan "No category found" hanya kalau tidak sedang loading dan hasil kosong */}
                                                                    <CommandEmpty>
                                                                        <p className="mb-2">No category found.</p>
                                                                        <Button variant="outline" onClick={() => setOpenModal(true)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                            </svg>
                                                                            Create Category
                                                                        </Button>
                                                                    </CommandEmpty>
                                                                </>
                                                            ) : (
                                                                <CommandGroup>
                                                                    {categories.map((category) => (
                                                                        <CommandItem
                                                                            key={category.id}
                                                                            value={category.id}
                                                                            onSelect={(currentValue) => {
                                                                                setValueCategory(currentValue === valueCategory ? "" : currentValue);
                                                                                setOpenCategory(false);
                                                                            }}
                                                                        >
                                                                            {category.name}
                                                                            <Check
                                                                                className={cn(
                                                                                    "ml-auto",
                                                                                    valueCategory === category.id ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            )}
                                                        </CommandList>

                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <RichEditor
                                                placeholder="Type your message here."
                                                value={field.value} onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your content blog.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>

                <Separator />

                {/* hasil */}

                <div className="post-view mt-8" id="post-view">
                    <h2 className="text-lg font-semibold mb-2">{submittedTitle}</h2>
                    <div dangerouslySetInnerHTML={{ __html: submittedContent }} />
                </div>
            </Form>
        </>

    )
}

export default FormPost