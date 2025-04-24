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
// import { useState } from "react"

const formSchema = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(2)
})

const FormPost = () => {
    const [submittedTitle, setSubmittedTitle] = useState('');
    const [submittedContent, setSubmittedContent] = useState('');

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: 'lorem ipsum dolor sit amet',
            content: defaultContent, // ⬅️ set default value di sini
        },
    });

    function convertOembedToIframe(html: string) {
        const div = document.createElement("div");
        div.innerHTML = html;

        div.querySelectorAll("oembed[url]").forEach((element) => {
            const url = element.getAttribute("url");
            if (url && url.includes("youtube.com")) {
                const videoId = new URL(url).searchParams.get("v");
                if (videoId) {
                    const iframe = document.createElement("iframe");

                    iframe.className = "mx-auto mt-2 w-3/4 aspect-video";

                    iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
                    iframe.setAttribute("allowfullscreen", "true");
                    element.replaceWith(iframe);
                }
            }
        });

        return div.innerHTML;
    }

    function convertIframeToOembed(html: string): string {
        const div = document.createElement("div");
        div.innerHTML = html;

        div.querySelectorAll("iframe").forEach((iframe) => {
            const src = iframe.getAttribute("src");

            if (src && src.includes("youtube.com/embed/")) {
                const videoId = src.split("/embed/")[1]?.split("?")[0];
                if (videoId) {
                    const oembed = document.createElement("oembed");
                    oembed.setAttribute("url", `https://www.youtube.com/watch?v=${videoId}`);

                    const figure = document.createElement("figure");
                    figure.className = "media";
                    figure.appendChild(oembed);

                    iframe.replaceWith(figure);
                }
            }
        });

        return div.innerHTML;
    }



    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmittedTitle(values.title);
        const transformedContent = convertOembedToIframe(values.content); // hanya ubah <oembed>, lainnya tetap
        setSubmittedContent(transformedContent);

        console.log("konten: ", values.content)
    }

    return (
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
                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        {/* <Textarea placeholder="Type your message here." {...field} /> */}
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
    )
}

export default FormPost