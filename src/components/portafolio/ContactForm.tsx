'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Mail, Phone, MapPin, Linkedin, Github, CheckCircle2, ChevronRight} from 'lucide-react';
import {Profile} from '@/hooks/use-portafolio-data';

interface ContactFormProps {
    profile: Profile | undefined;
}

export function ContactForm({profile}: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
        setFormData({name: '', email: '', subject: '', message: ''});
    };

    return (
        <section id="contacto" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-primary">Contáctame</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        ¿Tienes un proyecto en mente? ¡Hablemos y hagamos realidad tus ideas!
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="text-xl">Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {profile?.email && (
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="h-5 w-5 text-primary"/>
                                        </div>
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a
                                                href={`mailto:${profile.email}`}
                                                className="text-muted-foreground hover:text-primary"
                                            >
                                                {profile.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {profile?.phone && (
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="h-5 w-5 text-primary"/>
                                        </div>
                                        <div>
                                            <p className="font-medium">Teléfono</p>
                                            <a
                                                href={`tel:${profile.phone.replace(/\D/g, '')}`}
                                                className="text-muted-foreground hover:text-primary"
                                            >
                                                {profile.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {profile?.location && (
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-5 w-5 text-primary"/>
                                        </div>
                                        <div>
                                            <p className="font-medium">Ubicación</p>
                                            <p className="text-muted-foreground">{profile.location}</p>
                                        </div>
                                    </div>
                                )}
                                {profile?.linkedin && (
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Linkedin className="h-5 w-5 text-primary"/>
                                        </div>
                                        <div>
                                            <p className="font-medium">LinkedIn</p>
                                            <a
                                                href={profile.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary"
                                            >
                                                linkedin.com/in/oliver-rodriguez-a30629326
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {profile?.github && (
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Github className="h-5 w-5 text-primary"/>
                                        </div>
                                        <div>
                                            <p className="font-medium">GitHub</p>
                                            <a
                                                href={profile.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary"
                                            >
                                                github.com/Farid13-dev
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-2 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-xl">Disponibilidad</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Actualmente disponible para proyectos freelance y oportunidades de empleo a tiempo
                                    completo.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-primary">
                                    <CheckCircle2 className="h-5 w-5"/>
                                    <span className="font-medium">Disponible para nuevos proyectos</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="text-xl">Envíame un Mensaje</CardTitle>
                            <CardDescription>Completa el formulario y te responderé pronto</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Nombre
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Tu nombre"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Asunto
                                    </label>
                                    <Input
                                        id="subject"
                                        placeholder="Asunto del mensaje"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Mensaje
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Escribe tu mensaje aquí..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" size="lg">
                                    Enviar Mensaje
                                    <ChevronRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
